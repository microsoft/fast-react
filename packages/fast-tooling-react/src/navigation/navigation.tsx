import {
    getDataLocationNormalized,
    getDragHoverState,
    getFullDataLocation,
    getNavigation,
    normalizeTargetDataLocation,
    ReactComponent,
    ReactComponentProps,
    transformDataBeforeUpdate,
    TreeNavigationConfig,
    getDragEndUpdatedData,
} from "./navigation.utilities";
import React from "react";
import Foundation, {
    FoundationProps,
    HandledProps,
} from "@microsoft/fast-components-foundation-react";
import { cloneDeep, get, isEmpty, set, uniqueId } from "lodash-es";
import { canUseDOM } from "exenv-es6";
import {
    NavigationDataType,
    NavigationHandledProps,
    NavigationProps,
    NavigationState,
    TreeNavigation,
} from "./navigation.props";
import {
    keyCodeArrowDown,
    keyCodeArrowLeft,
    keyCodeArrowRight,
    keyCodeArrowUp,
    keyCodeEnd,
    keyCodeEnter,
    keyCodeHome,
    keyCodeSpace,
} from "@microsoft/fast-web-utilities";
import { DraggableNavigationTreeItem, NavigationTreeItem } from "./navigation-tree-item";
import { NavigationTreeItemProps } from "./navigation-tree-item.props";
import { endsWithSquareBracketsRegex } from "../data-utilities/location";
import {
    getDataUpdatedWithoutSourceData,
    getDataUpdatedWithSourceData,
    TargetPosition,
} from "../data-utilities/relocate";
import { DataType } from "../data-utilities/types";
import { PropertyKeyword } from "../form/utilities";

export default class Navigation extends Foundation<
    NavigationHandledProps,
    {},
    NavigationState
> {
    public static displayName: string = "Navigation";

    protected handledProps: HandledProps<NavigationHandledProps> = {
        schema: void 0,
        data: void 0,
        dragAndDropReordering: void 0,
        childOptions: void 0,
        onChange: void 0,
        onLocationUpdate: void 0,
        dataLocation: void 0,
        managedClasses: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement>;

    constructor(props: NavigationProps) {
        super(props);

        const navigation: TreeNavigationConfig = getNavigation(
            this.props.data,
            this.props.schema,
            this.props.childOptions
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);
        const activeNavigationItemId: string =
            typeof this.props.dataLocation === "string"
                ? navigationKeys.find((navigationKey: string) => {
                      return (
                          getFullDataLocation(navigation[0], navigationKey) ===
                          this.props.dataLocation
                      );
                  }) || navigation[1]
                : navigation[1];

        this.state = {
            navigation: navigation[0],
            data: cloneDeep(this.props.data),
            expandedNavigationIds: [],
            rootNavigationItemId: navigation[1],
            relocatingData: void 0,
            activeNavigationItemId,
            draggingNavigationId: null,
            draggingSourceDataLocation: null,
            dragHoverNavigationId: null,
            dragHoverAfterNavigationId: null,
            dragHoverBeforeNavigationId: null,
            dragHoverCenterNavigationId: null,
        };

        this.rootElement = React.createRef();
    }

    public render(): React.ReactNode {
        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                role={"tree"}
                className={this.props.managedClasses.navigation}
            >
                {this.renderTreeItem(this.state.rootNavigationItemId, 1)}
            </div>
        );
    }

    public componentDidUpdate(prevProps: NavigationProps): void {
        const updatedState: Partial<NavigationState> = {};

        if (prevProps.data !== this.props.data) {
            updatedState.navigation = getNavigation(
                this.props.data,
                this.props.schema,
                this.props.childOptions
            )[0];
            updatedState.data = cloneDeep(this.props.data);
        }

        if (!isEmpty(updatedState)) {
            this.setState(updatedState as NavigationState);
        }
    }

    /**
     * Renders the tree item containing element
     */
    private renderTreeItemContainer(
        navigationIds: string[],
        level: number
    ): React.ReactNode {
        return (
            <div className={this.props.managedClasses.navigation_itemList} role={"group"}>
                {this.renderTreeItems(navigationIds, level + 1)}
            </div>
        );
    }

    private renderTreeItem(navigationId: string, level: number): React.ReactNode {
        const schemaLocationSegments: string[] = this.state.navigation[
            navigationId
        ].schemaLocation.split(".");
        const lastSchemaPropertyName: string =
            schemaLocationSegments[schemaLocationSegments.length - 1];
        const isDefaultChildrenContainer: boolean =
            lastSchemaPropertyName === "children" &&
            this.state.navigation[navigationId].relativeDataLocation === null;

        if (isDefaultChildrenContainer) {
            return this.renderTreeItems(this.state.navigation[navigationId].items, level);
        }

        const isRootDataLocation: boolean =
            navigationId === this.state.rootNavigationItemId;
        const dataType: NavigationDataType = this.state.navigation[navigationId].type;
        const props: NavigationTreeItemProps = {
            className: this.getItemClassName(dataType, navigationId),
            contentClassName: this.getItemContentClassName(navigationId),
            expandTriggerClassName: this.getItemExpandTriggerClassName(),
            navigationId,
            dragHover:
                !isRootDataLocation && navigationId === this.state.dragHoverNavigationId,
            dragHoverBefore:
                !isRootDataLocation &&
                navigationId === this.state.dragHoverBeforeNavigationId,
            dragHoverAfter:
                !isRootDataLocation &&
                navigationId === this.state.dragHoverAfterNavigationId,
            expanded: this.isExpanded(navigationId),
            handleClick: this.handleTreeItemClick(navigationId, dataType),
            handleKeyDown: this.handleTreeItemKeyDown(navigationId, dataType),
            handleSelectionClick: this.handleTreeItemSelectionClick(navigationId),
            text: this.state.navigation[navigationId].text,
            type: this.state.navigation[navigationId].type,
            onDragHover: this.handleDragHover,
            onDragStart: this.handleDragStart,
            onDragEnd: this.handleDragEnd,
        };
        // if either there are no associate child items
        // or there is only an empty default children
        // do not supply children to the draggable item
        const children: React.ReactNode =
            this.state.navigation[navigationId].items.length > 1 ||
            (this.state.navigation[navigationId].items.length === 1 &&
                (this.state.navigation[this.state.navigation[navigationId].items[0]].items
                    .length !== 0 ||
                    this.state.navigation[this.state.navigation[navigationId].items[0]]
                        .type !== NavigationDataType.children))
                ? this.renderTreeItemContainer(
                      this.state.navigation[navigationId].items,
                      level
                  )
                : void 0;

        if (
            this.props.dragAndDropReordering &&
            (navigationId !== this.state.rootNavigationItemId ||
                this.state.navigation[navigationId].type ===
                    NavigationDataType.component ||
                this.state.navigation[navigationId].type ===
                    NavigationDataType.children ||
                this.state.navigation[navigationId].type ===
                    NavigationDataType.primitiveChild)
        ) {
            return (
                <DraggableNavigationTreeItem key={navigationId} {...props}>
                    {children}
                </DraggableNavigationTreeItem>
            );
        }

        return (
            <NavigationTreeItem key={navigationId} {...props}>
                {children}
            </NavigationTreeItem>
        );
    }

    private renderTreeItems(navigationIds: string[], level: number): React.ReactNode {
        return this.getWeightedNavigationIds(navigationIds).map(
            (navigationId: string) => {
                return this.renderTreeItem(navigationId, level);
            }
        );
    }

    /**
     * Weight navigation ids so that children always display at the bottom
     */
    private getWeightedNavigationIds(navigationIds: string[]): string[] {
        const weightedNavigationIds: string[] = [...navigationIds];
        const childrenNavigationId: string | undefined = weightedNavigationIds.find(
            (navigationId: string) => {
                const schemaLocationSegments: string[] = this.state.navigation[
                    navigationId
                ].schemaLocation.split(".");
                const lastSchemaPropertyName: string =
                    schemaLocationSegments[schemaLocationSegments.length - 1];

                return (
                    lastSchemaPropertyName === "children" &&
                    this.state.navigation[navigationId].relativeDataLocation === null
                );
            }
        );
        const childrenNavigationIdIndex: number = weightedNavigationIds.indexOf(
            childrenNavigationId
        );

        if (childrenNavigationIdIndex !== -1) {
            weightedNavigationIds.splice(childrenNavigationIdIndex, 1);
            weightedNavigationIds.push(childrenNavigationId);
        }

        return weightedNavigationIds;
    }

    private handleDragEnd = (): void => {
        if (typeof this.props.onChange === "function") {
            const updatedData: ReactComponentProps = getDragEndUpdatedData(
                this.state.navigation,
                this.state.draggingNavigationId,
                this.state.data,
                this.state.relocatingData
            );

            this.props.onChange(updatedData);
        }

        this.setState({
            draggingNavigationId: null,
            draggingSourceDataLocation: null,
        });
    };

    /**
     * Handles the hovering of an element when dragging
     */
    private handleDragHover = (
        targetDragHoverNavigationId: string,
        sourceDragHoverNavigationId: string,
        direction: TargetPosition
    ): void => {
        const state: Partial<NavigationState> = getDragHoverState(
            this.state.navigation,
            targetDragHoverNavigationId,
            sourceDragHoverNavigationId,
            direction
        );

        // open the item being hovered
        if (direction === TargetPosition.insert) {
            const expandNavigationItemHovered: NodeJS.Timer = setTimeout((): void => {
                // check to see if this navigation id is still being hovered
                if (
                    this.state.dragHoverNavigationId === targetDragHoverNavigationId &&
                    this.state.expandedNavigationIds.indexOf(
                        targetDragHoverNavigationId
                    ) === -1
                ) {
                    this.setState({
                        expandedNavigationIds: [targetDragHoverNavigationId].concat(
                            this.state.expandedNavigationIds
                        ),
                    });
                } else {
                    clearTimeout(expandNavigationItemHovered);
                }
            }, 500);
        }

        if (
            this.state.dragHoverNavigationId !== state.dragHoverNavigationId ||
            this.state.dragHoverAfterNavigationId !== state.dragHoverAfterNavigationId ||
            this.state.dragHoverBeforeNavigationId !==
                state.dragHoverBeforeNavigationId ||
            this.state.dragHoverCenterNavigationId !== state.dragHoverCenterNavigationId
        ) {
            this.setState(state as NavigationState);
        }
    };

    private findCurrentTreeItemIndex(nodes: HTMLElement[], navigationId: string): number {
        return nodes.findIndex((node: HTMLElement) => {
            return node.dataset.navigationid === navigationId;
        });
    }

    private focusNextTreeItem(navigationId: string): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();
            const currentIndex: number = this.findCurrentTreeItemIndex(
                nodes,
                navigationId
            );
            const nextIndex: number =
                currentIndex !== -1 && currentIndex !== nodes.length - 1
                    ? currentIndex + 1
                    : nodes.length - 1;
            nodes[nextIndex].focus();
        }
    }

    private focusPreviousTreeItem(navigationId: string): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();
            const currentIndex: number = this.findCurrentTreeItemIndex(
                nodes,
                navigationId
            );
            const previousIndex: number =
                currentIndex !== -1 && currentIndex !== 0 ? currentIndex - 1 : 0;
            nodes[previousIndex].focus();
        }
    }

    private focusFirstTreeItem(): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();

            nodes[0].focus();
        }
    }

    private focusLastTreeItem(): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();

            nodes[nodes.length - 1].focus();
        }
    }

    private focusAndExpandTreeItems(
        navigationId: string,
        type: NavigationDataType
    ): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();
            const currentIndex: number = this.findCurrentTreeItemIndex(
                nodes,
                navigationId
            );
            const ariaExpanded: string = get(
                nodes[currentIndex],
                'parentElement.attributes["aria-expanded"].value'
            );

            if (ariaExpanded === "true" && nodes[currentIndex + 1]) {
                nodes[currentIndex + 1].focus();
            } else if (ariaExpanded === "false") {
                this.toggleItems(navigationId, type);
            }
        }
    }

    private focusAndCollapseTreeItems(
        navigationId: string,
        type: NavigationDataType
    ): void {
        if (canUseDOM()) {
            const nodes: HTMLElement[] = this.getTreeItemNodes();
            const currentIndex: number = this.findCurrentTreeItemIndex(
                nodes,
                navigationId
            );
            const ariaExpanded: string = get(
                nodes[currentIndex],
                'parentElement.attributes["aria-expanded"].value'
            );

            if (
                ariaExpanded === "false" &&
                nodes[currentIndex - 1] &&
                (nodes[currentIndex - 1] === nodes[currentIndex].parentElement ||
                    nodes[currentIndex - 1].parentElement ===
                        get(
                            nodes[currentIndex],
                            "parentElement.parentElement.parentElement"
                        ))
            ) {
                nodes[currentIndex - 1].focus();
            } else if (ariaExpanded === "true") {
                this.toggleItems(navigationId, type);
            } else if (ariaExpanded === undefined && nodes[currentIndex - 1]) {
                nodes[currentIndex - 1].focus();
            }
        }
    }

    private getItemClassName(
        dataType: NavigationDataType,
        navigationId: string
    ): () => string {
        return (): string => {
            let classes: string = this.props.managedClasses.navigation_item;

            if (
                dataType === NavigationDataType.component ||
                dataType === NavigationDataType.primitiveChild
            ) {
                classes = `${classes} ${get(
                    this.props,
                    `managedClasses.navigation_item__${dataType}`,
                    ""
                )}`;

                if (this.props.dragAndDropReordering) {
                    classes = `${classes} ${get(
                        this.props,
                        "managedClasses.navigation_item__draggable",
                        ""
                    )}`;

                    if (this.state.draggingNavigationId === navigationId) {
                        classes = `${classes} ${get(
                            this.props,
                            "managedClasses.navigation_item__dragging",
                            ""
                        )}`;
                    }
                }
            }

            return classes;
        };
    }

    private getItemExpandTriggerClassName(): string {
        return get(this.props, "managedClasses.navigation_itemExpandTrigger", "");
    }

    private getItemContentClassName(navigationId: string): string {
        let classes: string = this.props.managedClasses.navigation_itemContent;

        if (navigationId === this.state.activeNavigationItemId) {
            classes = `${classes} ${get(
                this.props,
                "managedClasses.navigation_itemContent__active",
                ""
            )}`;
        }

        return classes;
    }

    private getTreeItemNodes(): HTMLElement[] {
        const nodes: HTMLElement[] = Array.from(
            this.rootElement.current.querySelectorAll(
                "a[role='treeitem'], div[role='treeitem'] > span"
            )
        );
        return nodes.filter((node: HTMLElement) => node.offsetParent !== null);
    }

    /**
     * Handles key up on a tree item
     */
    private handleTreeItemKeyDown = (
        navigationId: string,
        type: NavigationDataType
    ): ((e: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>) => void) => {
        return (e: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>): void => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                switch (e.keyCode) {
                    case keyCodeEnter:
                    case keyCodeSpace:
                        if (e.target === e.currentTarget) {
                            this.toggleItems(navigationId, type);
                        }
                        break;
                    case keyCodeArrowDown:
                        this.focusNextTreeItem(navigationId);
                        break;
                    case keyCodeArrowUp:
                        this.focusPreviousTreeItem(navigationId);
                        break;
                    case keyCodeArrowRight:
                        this.focusAndExpandTreeItems(navigationId, type);
                        break;
                    case keyCodeArrowLeft:
                        this.focusAndCollapseTreeItems(navigationId, type);
                        break;
                    case keyCodeHome:
                        this.focusFirstTreeItem();
                        break;
                    case keyCodeEnd:
                        this.focusLastTreeItem();
                        break;

                    default:
                        if (e.key.toLowerCase() === "d" && e.ctrlKey) {
                            e.preventDefault();
                            this.duplicateCurrentItem(navigationId, type);
                        }
                        break;
                }
            }
        };
    };

    /**
     * Handles clicking on a tree item
     */
    private handleTreeItemClick = (
        navigationId: string,
        type: NavigationDataType
    ): ((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void) => {
        return (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                this.toggleItems(navigationId, type);
            }
        };
    };

    private handleTreeItemSelectionClick = (
        navigationId: string
    ): ((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void) => {
        return (e: React.MouseEvent<HTMLAnchorElement>): void => {
            e.preventDefault();

            if (e.target === e.currentTarget) {
                this.selectItem(navigationId);
            }
        };
    };

    private handleDragStart = (navigationId: string, type: NavigationDataType): void => {
        const sourceDataLocation: string = getFullDataLocation(
            this.state.navigation,
            navigationId
        ).replace(/\.props$/, "");

        this.setState({
            expandedNavigationIds: this.state.expandedNavigationIds.filter(
                (expandedNavigationItem: string) => {
                    return expandedNavigationItem !== navigationId;
                }
            ),
            draggingNavigationId: navigationId,
            data: getDataUpdatedWithoutSourceData({
                data: this.state.data,
                sourceDataLocation,
            }) as ReactComponentProps,
            draggingSourceDataLocation: sourceDataLocation,
            relocatingData: get(this.props.data, sourceDataLocation),
        });

        if (
            typeof this.props.onLocationUpdate === "function" &&
            type !== NavigationDataType.children
        ) {
            this.props.onLocationUpdate(
                getFullDataLocation(this.state.navigation, navigationId)
            );
        }
    };

    /**
     * Toggles the items by adding/removing them from the expandedItems array
     */
    private toggleItems(navigationId: string, type: NavigationDataType): void {
        const isExpanded: boolean =
            this.state.expandedNavigationIds.find((expandedNavigationItem: string) => {
                return expandedNavigationItem === navigationId;
            }) !== undefined;
        const updatedState: Partial<NavigationState> = {};
        updatedState.expandedNavigationIds = !isExpanded
            ? [navigationId, ...this.state.expandedNavigationIds]
            : this.state.expandedNavigationIds.filter(
                  (expandedNavigationItem: string) => {
                      return expandedNavigationItem !== navigationId;
                  }
              );

        if (this.props.dataLocation === undefined) {
            updatedState.activeNavigationItemId = navigationId;
        }

        this.setState(updatedState as NavigationState);

        if (
            typeof this.props.onLocationUpdate === "function" &&
            type !== NavigationDataType.children
        ) {
            this.props.onLocationUpdate(
                getFullDataLocation(this.state.navigation, navigationId)
            );
        }
    }

    private selectItem(navigationId: string): void {
        this.setState({
            activeNavigationItemId: navigationId,
        });

        if (typeof this.props.onLocationUpdate === "function") {
            this.props.onLocationUpdate(
                getFullDataLocation(this.state.navigation, navigationId)
            );
        }
    }

    /**
     * Determines if the tree item should be expanded
     */
    private isExpanded(navigationId: string): boolean {
        return (
            this.state.expandedNavigationIds.find((expandedNavigationItem: string) => {
                return expandedNavigationItem === navigationId;
            }) !== undefined
        );
    }

    /**
     * Duplicates the item
     * TODO: remove this as part of https://github.com/microsoft/fast-dna/issues/2174
     */
    private duplicateCurrentItem = (
        navigationId: string,
        type: NavigationDataType
    ): void => {
        if (
            type !== NavigationDataType.component &&
            type !== NavigationDataType.primitiveChild
        ) {
            return;
        }

        const updatedData: ReactComponentProps = cloneDeep(this.props.data);

        if (typeof this.props.onChange === "function") {
            const dataLocation: string = getDataLocationNormalized(
                getFullDataLocation(this.state.navigation, navigationId)
            );
            const copiedData: string | ReactComponent = get(
                this.props.data,
                dataLocation
            );
            const arrayIndex: RegExpMatchArray | null = dataLocation.match(
                endsWithSquareBracketsRegex
            );

            if (arrayIndex !== null) {
                const parentDataLocation: string = dataLocation.replace(
                    endsWithSquareBracketsRegex,
                    ""
                );
                const parentData: Array<string | ReactComponent> = get(
                    this.props.data,
                    parentDataLocation
                );
                parentData.splice(parseInt(arrayIndex[1], 10), 0, copiedData);
                set(updatedData, parentDataLocation, parentData);
            } else {
                const newData: Array<string | ReactComponent> = [copiedData, copiedData];
                set(updatedData, dataLocation, newData);
            }

            this.props.onChange(updatedData);
        }
    };
}
