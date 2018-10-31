import * as React from "react";
import { jss, stylesheetManager, stylesheetRegistry } from "./jss";
import { SheetsManager } from "jss";
import { DesignSystem } from "./design-system-provider";
import {
    ComponentStyles,
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager";
import { isEqual, merge } from "lodash-es";
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
 * Describes an interface for adjusting a styled component
 * per component instance
 */
export interface JSSManagedComponentProps<S, C> {
    jssStyleSheet?: Partial<ComponentStyles<S, C>>;
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

        if (Boolean(this.props.styles)) {
            this.primaryStylesheetIndex = JSSManager.index--;
            state.primaryStyleSheet = this.createPrimaryStyleSheet();
            state.primaryStyleSheet.attach();
            state.primaryStyleSheet.update(props.designSystem);
        }

        this.state = state;
    }

    public componentDidUpdate(
        prevProps: JSSManagerProps<S, C>,
        prevState: JSSManagerState
    ): void {
        if (!isEqual(this.props.designSystem, prevProps.designSystem)) {
            this.updatePrimaryStyleSheet();
        }

        // TODO: add update path for jssStyleSheet
    }

    public componentWillUnmount(): void {
        if (this.state.primaryStyleSheet) {
            this.removePrimaryStyleSheet();

            // Increment the global stylesheet index tracker when a component unmounts
            // so that we can recycle index values and avoid eventually running out of numbers
            // if an application lives for a long time.
            JSSManager.index++;
        }
    }

    public render(): React.ReactNode {
        return this.props.render(this.classNames());
    }

    /**
     * Updates a dynamic stylesheet with context
     */
    public updatePrimaryStyleSheet(): void {
        if (typeof this.props.styles === "function") {
            this.resetPrimaryStyleSheet();
        } else if (Boolean(this.state.primaryStyleSheet)) {
            this.state.primaryStyleSheet.update(this.props.designSystem);
        }
    }

    /**
     * Remove a JSS stylesheet
     */
    private removePrimaryStyleSheet(): void {
        this.state.primaryStyleSheet.detach();
        stylesheetRegistry.remove(this.state.primaryStyleSheet);
        jss.removeStyleSheet(this.state.primaryStyleSheet);
    }

    /**
     * Reset a JSS stylesheet relative to current props
     */
    private resetPrimaryStyleSheet(): void {
        this.removePrimaryStyleSheet();
        this.setState(
            (
                previousState: JSSManagerState,
                props: JSSManagerProps<S, C>
            ): Partial<JSSManagerState> => {
                return {
                    primaryStyleSheet: Boolean(this.props.styles)
                        ? this.createPrimaryStyleSheet()
                        : null,
                };
            },
            (): void => {
                if (Boolean(this.state.primaryStyleSheet)) {
                    this.state.primaryStyleSheet.attach().update(this.props.designSystem);
                }
            }
        );
    }

    /**
     * Creates a JSS stylesheet from the dynamic portion of an associated style object and any style object passed
     * as props
     */
    private createPrimaryStyleSheet(): any {
        const stylesheet: ComponentStyleSheet<S, C> =
            typeof this.props.styles === "function"
                ? this.props.styles(this.props.designSystem)
                : this.props.styles;

        const jssSheet: any = jss.createStyleSheet(stylesheet, {
            link: true,
            index: this.primaryStylesheetIndex,
        });

        stylesheetRegistry.add(jssSheet);

        return jssSheet;
    }

    /**
     * returns the compiled classes
     */
    private classNames(): { [className in keyof S]?: string } {
        return Boolean(this.state.primaryStyleSheet)
            ? this.state.primaryStyleSheet.classes
            : {};
    }
}
