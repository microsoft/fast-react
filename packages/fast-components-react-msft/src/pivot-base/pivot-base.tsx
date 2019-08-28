import React from "react";
import { get } from "lodash-es";
import ReactDOM from "react-dom";
import { canUseDOM } from "exenv-es6";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    PivotBaseHandledProps,
    PivotBaseManagedClasses,
    PivotBaseProps,
    PivotBaseUnhandledProps,
} from "./pivot-base.props";
import {
    ManagedClasses,
    PivotClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";
import { TabsClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { Direction } from "@microsoft/fast-web-utilities";
import { toPx } from "@microsoft/fast-jss-utilities";
import { Tabs as BaseTabs } from "@microsoft/fast-components-react-base";
import { DisplayNamePrefix } from "../utilities";

export interface PivotBaseState {
    tabPanelIndex: number;
}

class PivotBase extends Foundation<PivotBaseHandledProps, PivotBaseUnhandledProps, PivotBaseState> {
    public static displayName: string = `${DisplayNamePrefix}PivotBase`;

    private tabsRef: React.RefObject<BaseTabs>;

    private prevTabPanelIndex: number;

    constructor(props: PivotBaseProps) {
        super(props);

        if (Array.isArray(this.props.items)) {
            this.state = {
                tabPanelIndex: 0,
            };
        }

        this.tabsRef = React.createRef();
    }

    public componentDidMount(): void {
        this.prevTabPanelIndex = this.state.tabPanelIndex;
    }

    public componentDidUpdate(prevProps: PivotBaseProps, prevState: PivotBaseState): void {
        if (this.props.activeId !== prevProps.activeId) {
            this.updateTabPanelIndex();
        }

        if (this.state.tabPanelIndex !== prevState.tabPanelIndex) {
            this.prevTabPanelIndex = this.state.tabPanelIndex;
        }
    }

    protected handledProps: HandledProps<PivotBaseHandledProps> = {
        label: void 0,
        items: void 0,
        managedClasses: void 0,
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        console.log(this.props.managedClasses)
        return (
            <BaseTabs
                {...this.unhandledProps()}
                ref={this.tabsRef}
                managedClasses={this.generatePivotClassNames()}
                activeId={this.props.activeId}
                onUpdate={this.props.onUpdate}
                items={this.props.items}
                label={this.props.label}
            />
        );
    }

    /**
     * Returns tabs managedclasses with new carousel-specific JSS
     */
    protected generatePivotClassNames(): TabsClassNameContract {
        if (typeof get(this.props, "managedClasses") === "object") {
            return {
                tabs: get(this.props, "managedClasses.pivot"),
                tabs_tabPanels: this.generateTabPanelsClassNames(),
                tabs_tabList: get(this.props, "managedClasses.pivot_tabList"),
                tabs_tabContent: get(this.props, "managedClasses.pivot_tabContent"),
                tabs_tabPanelContent: get(
                    this.props,
                    "managedClasses.pivot_tabPanelContent"
                ),
                tab: get(this.props, "managedClasses.pivot_tab"),
                tab__active: get(this.props, "managedClasses.pivot_tab__active"),
                tabPanel: get(this.props, "managedClasses.pivot_tabPanel"),
                tabPanel__hidden: get(
                    this.props,
                    "managedClasses.pivot_tabPanel__hidden"
                ),
            };
        }
    }

    private isSelected(element: HTMLElement): boolean {
        return element.attributes["aria-selected"].value === "true";
    }

    private updateTabPanelIndex(): void {
        if (canUseDOM() && this.tabsRef.current && Array.isArray(this.props.items)) {
            const tabElement: HTMLElement = ReactDOM.findDOMNode(
                this.tabsRef.current
            ) as HTMLElement;

            const mytabsArray: HTMLElement[] = Array.prototype.slice.call(
                tabElement.querySelectorAll("[role='tab']")
            );

            this.setState({
                tabPanelIndex: mytabsArray.findIndex(this.isSelected),
            });
        }
    }

    private generateTabPanelsClassNames(): string {
        let className: string = get(this.props, "managedClasses.pivot_tabPanels");
        if (typeof className === "string") {
            if (this.state.tabPanelIndex === this.prevTabPanelIndex) {
                return className;
            } else if (this.state.tabPanelIndex < this.prevTabPanelIndex) {
                className = `${className} ${get(
                    this.props,
                    "managedClasses.pivot_tabPanels__animatePrevious",
                    ""
                )}`;
            } else {
                className = `${className} ${get(
                    this.props,
                    "managedClasses.pivot_tabPanels__animateNext",
                    ""
                )}`;
            }
            console.log("Tab Panels", className)
            return className;
        }
    }
}

export default PivotBase;
export * from "./pivot-base.props";
