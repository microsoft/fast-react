import * as React from "react";
import { jss, stylesheetManager, stylesheetRegistry } from "./jss";
import { SheetsManager } from "jss";
import { DesignSystem } from "./design-system-provider";
import {
    ComponentStyles,
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager";
import { isEqual, mergeWith } from "lodash-es";
import { Consumer } from "./context";

/**
 * State interface for JSS manager
 */
export interface JSSManagerState {
    /**
     * Stores a JSS stylesheet created from the styles prop
     */
    primaryStyleSheet?: any;

    /**
     * Stores a JSS stylesheet created from the jssStyleSheet prop
     */
    secondaryStyleSheet?: any;
}

/**
 * Enum describing the types of stylesheets the JSSmanager manages
 */
export enum StyleSheetTypes {
    primary,
    secondary,
}

/**
 * Describes an interface for adjusting a styled component
 * per component instance
 */
export interface JSSManagedComponentProps<S, C> {
    jssStyleSheet?: ComponentStyles<S, C>;
}

export interface JSSManagerProps<S, C> extends JSSManagedComponentProps<S, C> {
    /**
     * The styles for the JSS manager to compile
     */
    styles?: ComponentStyles<S, C>;

    /**
     * The design-system to compile the styles with
     */
    designSystem?: C;

    /**
     * Render the child component
     */
    render: (managedClasses: { [className in keyof S]?: string }) => React.ReactNode;
}

/**
 * Prop typing for the JSSManager
 */
export type ManagedJSSProps<T, S, C> = Pick<
    T,
    Exclude<keyof T, keyof ManagedClasses<C>>
> &
    JSSManagedComponentProps<S, C>;

/**
 * The JSSManger. This class manages JSSStyleSheet compilation and passes generated class-names
 * down to child component
 */
export class JSSManager<S, C> extends React.Component<
    JSSManagerProps<S, C>,
    JSSManagerState
> {
    /**
     * The style manager is responsible for attaching and detaching style elements when
     * components mount and un-mount
     */
    private static stylesheetManager: SheetsManager = stylesheetManager;

    /**
     * JSS allows us to use an index to order the created style elements. The higher the index,
     * the later in the document the style element will be created.
     *
     * This static index allows us to globally track every stylesheet created by the JSSManager. Each
     * instance decrements this.primaryStylesheetIndex and assigns itself the decremented value. The effect of this is that
     * a React parent will always have a higher index than it's children because react constructs trees
     * recursively starting at the root. With a parent always having a higher index then it's children,
     * we can inform JSS of this order preference and ensure parent stylesheets always come later in the DOM.
     *
     * Inspiration for this approach to style element ordering comes from
     * https://github.com/cssinjs/react-jss/blob/master/src/injectSheet.js
     */
    private static index: number = -1000;

    /**
     * Controls the rendering index for the primary stylesheet
     */
    private primaryStylesheetIndex: number;

    private secondaryStyleSheetIndex: number;

    constructor(props: JSSManagerProps<S, C>) {
        super(props);

        const state: JSSManagerState = {};
        this.primaryStylesheetIndex = JSSManager.index--;

        // We always want to render the secondary stylesheet after the primary stylesheet
        this.secondaryStyleSheetIndex = this.primaryStylesheetIndex + 1;

        if (this.hasPrimaryStyleSheet) {
            state.primaryStyleSheet = this.createStyleSheet(
                this.props.styles,
                this.primaryStylesheetIndex
            );
            state.primaryStyleSheet.attach();
            state.primaryStyleSheet.update(props.designSystem);
        }

        if (this.props.jssStyleSheet) {
            state.secondaryStyleSheet = this.createStyleSheet(
                this.props.jssStyleSheet,
                this.secondaryStyleSheetIndex
            );
            state.secondaryStyleSheet.attach();
            state.secondaryStyleSheet.update(props.designSystem);
        }

        this.state = state;
    }

    public componentDidUpdate(
        prevProps: JSSManagerProps<S, C>,
        prevState: JSSManagerState
    ): void {
        const jssStyleSheet: ComponentStyles<S, C> = this.props.jssStyleSheet;

        if (!isEqual(this.props.designSystem, prevProps.designSystem)) {
            if (this.hasPrimaryStyleSheet) {
                this.updateStyleSheet(StyleSheetTypes.primary);
            }
        }

        if (prevProps.jssStyleSheet !== jssStyleSheet) {
            if (!jssStyleSheet && this.state.secondaryStyleSheet) {
                // If we don't have props, lets remove the stylesheet.
                this.removeStyleSheet(this.state.secondaryStyleSheet);
            } else if (this.props.jssStyleSheet && !this.state.secondaryStyleSheet) {
                // If we do have props but no state, we need to create a stylesheet
                // this.setState({
                //     secondaryStyleSheet: this.createStyleSheet(this.props.jssStyleSheet, this.secondaryStyleSheetIndex)
                // })
                this.setState(
                    (
                        previousState: JSSManagerState,
                        props: JSSManagerProps<S, C>
                    ): Partial<JSSManagerState> => {
                        return {
                            secondaryStyleSheet: this.createStyleSheet(
                                jssStyleSheet,
                                this.secondaryStyleSheetIndex
                            ),
                        };
                    },
                    (): void => {
                        this.state.secondaryStyleSheet
                            .attach()
                            .update(this.props.designSystem);
                    }
                );
            } else {
                // Otherwise, we should reset because the stylesheet itself has changed
                this.resetStyleSheet(StyleSheetTypes.secondary);
            }
        }
    }

    public componentWillUnmount(): void {
        // Increment the global stylesheet index tracker when a component unmounts
        // so that we can recycle index values and avoid eventually running out of numbers
        // if an application lives for a long time.
        JSSManager.index++;

        if (this.hasPrimaryStyleSheet) {
            this.removeStyleSheet(this.state.primaryStyleSheet);
        }
    }

    public render(): React.ReactNode {
        return this.props.render(this.classNames());
    }

    /**
     * Updates a dynamic stylesheet with context
     */
    private updateStyleSheet(sheetType: StyleSheetTypes): void {
        const source: ComponentStyles<S, C> = this.styleSheetSourceByType(sheetType);
        const jssSheet: any = this.jssSheetByType(sheetType);

        if (typeof source === "function") {
            this.resetStyleSheet(sheetType);
        } else if (jssSheet && typeof jssSheet.update === "function") {
            jssSheet.update(this.props.designSystem);
        }
    }

    /**
     * Return the source of a type of stylesheet
     */
    private styleSheetSourceByType(sheetType: StyleSheetTypes): ComponentStyles<S, C> {
        return sheetType === StyleSheetTypes.primary
            ? this.props.styles
            : this.props.jssStyleSheet;
    }

    /**
     * Return the jss style sheet instance by type
     */
    private jssSheetByType(sheetType: StyleSheetTypes): any {
        return sheetType === StyleSheetTypes.primary
            ? this.state.primaryStyleSheet
            : this.state.secondaryStyleSheet;
    }

    private sheetIndexByType(sheetType: StyleSheetTypes): number {
        return sheetType === StyleSheetTypes.primary
            ? this.primaryStylesheetIndex
            : this.secondaryStyleSheetIndex;
    }

    /**
     * Remove a JSS stylesheet
     */
    private removeStyleSheet(sheet: any): void {
        sheet.detach();
        stylesheetRegistry.remove(sheet);
        jss.removeStyleSheet(sheet);
    }

    /**
     * Reset a JSS stylesheet relative to current props
     */
    private resetStyleSheet(sheetType: StyleSheetTypes): void {
        this.removeStyleSheet(this.jssSheetByType(sheetType));
        this.setState(
            (
                previousState: JSSManagerState,
                props: JSSManagerProps<S, C>
            ): Partial<JSSManagerState> => {
                return {
                    [sheetType === StyleSheetTypes.primary
                        ? "primaryStyleSheet"
                        : "secondaryStyleSheet"]: this.createStyleSheet(
                        this.styleSheetSourceByType(sheetType),
                        this.sheetIndexByType(sheetType)
                    ),
                };
            },
            (): void => {
                this.jssSheetByType(sheetType)
                    .attach()
                    .update(this.props.designSystem);
            }
        );
    }

    /**
     * Creates a secondary stylesheet
     */
    private createStyleSheet(styles: ComponentStyles<S, C>, index: number): any {
        const stylesheet: ComponentStyleSheet<S, C> =
            typeof styles === "function" ? styles(this.props.designSystem) : styles;

        const jssSheet: any = jss.createStyleSheet(stylesheet, {
            link: true,
            index,
        });

        stylesheetRegistry.add(jssSheet);

        return jssSheet;
    }

    /**
     * Checks to see if this component has a primary stylesheet
     */
    private get hasPrimaryStyleSheet(): boolean {
        return Boolean(this.props.styles);
    }

    /**
     * returns the compiled classes
     */
    private classNames(): { [className in keyof S]?: string } {
        return this.hasPrimaryStyleSheet && this.state.secondaryStyleSheet
            ? mergeWith(
                  this.state.primaryStyleSheet.classes,
                  this.state.secondaryStyleSheet.classes,
                  this.mergeClassNames
              )
            : this.state.secondaryStyleSheet
                ? this.state.secondaryStyleSheet.classes
                : this.hasPrimaryStyleSheet
                    ? this.state.primaryStyleSheet.classes
                    : {};
    }

    /**
     * Merges class-names together
     */
    private mergeClassNames(objValue: string, srcValue: string): string {
        return objValue.concat(" ", srcValue).trim();
    }
}
