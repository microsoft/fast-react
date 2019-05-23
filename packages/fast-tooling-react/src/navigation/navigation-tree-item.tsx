import React from "react";
import { NavigationDataType, TreeNavigation } from "./navigation.props";
import {
    DragSource,
    DragSourceCollector,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceSpec,
    DropTarget,
    DropTargetCollector,
    DropTargetConnector,
    DropTargetHookSpec,
    DropTargetMonitor,
    DropTargetSpec,
} from "react-dnd";

interface NavigationTreeItemProps
    extends NavigationTreeItemDragSourceCollectedProps,
        NavigationTreeItemDropTargetCollectedProps {
    children?: React.ReactNode;
    className: string;
    contentClassName: string;
    dataLocation: string;
    expanded: boolean;
    handleClick: React.MouseEventHandler<HTMLElement>;
    handleKeyUp: React.KeyboardEventHandler<HTMLElement>;
    level: number;
    navigationLength: number;
    positionInNavigation: number;
    text: string;
    type: NavigationDataType;
}

export interface NavigationTreeItemDragSourceCollectedProps {
    connectDragSource?: (el: JSX.Element) => JSX.Element;
    isDragging?: boolean;
}

export interface NavigationTreeItemDropTargetCollectedProps {
    connectDropTarget?: (el: JSX.Element) => JSX.Element;
}

export const NavigationTreeItemDragID: symbol = Symbol();

export interface NavigationTreeItemDragObject {
    id: string;
}
export const navigationTreeItemDragSource: DragSourceSpec<
    NavigationTreeItemProps,
    NavigationTreeItemDragObject
> = {
    beginDrag: (
        props: NavigationTreeItemProps,
        monitor: DragSourceMonitor,
        component: any
    ): NavigationTreeItemDragObject => {
        return { id: props.dataLocation };
    },
};

export const navigationTreeItemDropSource: DropTargetSpec<NavigationTreeItemProps> = {};

const navigationTreeItemDragSourceCollect: DragSourceCollector<
    Required<NavigationTreeItemDragSourceCollectedProps>,
    NavigationTreeItemProps
> = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
): Required<NavigationTreeItemDragSourceCollectedProps> => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

const navigationTreeItemDropTargetCollect: DropTargetCollector<
    Required<NavigationTreeItemDropTargetCollectedProps>,
    NavigationTreeItemProps
> = (
    connect: DropTargetConnector,
    monitor: DropTargetMonitor
): Required<NavigationTreeItemDropTargetCollectedProps> => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
};

export function NavigationTreeItem(props: NavigationTreeItemProps): JSX.Element {
    const item: JSX.Element =
        props.children !== undefined ? (
            <div
                className={props.className}
                role={"treeitem"}
                aria-level={props.level}
                aria-setsize={props.navigationLength}
                aria-posinset={props.positionInNavigation}
                aria-expanded={props.expanded}
                onClick={props.handleClick}
                onKeyUp={props.handleKeyUp}
            >
                <span
                    className={props.contentClassName}
                    onClick={props.handleClick}
                    onKeyUp={props.handleKeyUp}
                    tabIndex={0}
                    data-location={props.dataLocation}
                >
                    {props.text}
                </span>
                {props.children}
            </div>
        ) : (
            <div className={props.className} role={"none"}>
                <a
                    className={props.contentClassName}
                    role={"treeitem"}
                    data-location={props.dataLocation}
                    aria-level={props.level}
                    aria-setsize={props.navigationLength}
                    aria-posinset={props.positionInNavigation}
                    href={"#"}
                    onClick={props.handleClick}
                    onKeyUp={props.handleKeyUp}
                    tabIndex={0}
                >
                    {props.text}
                </a>
            </div>
        );

    return typeof props.connectDropTarget === "function" &&
        typeof props.connectDragSource === "function" &&
        props.type === NavigationDataType.childrenItem
        ? props.connectDragSource(props.connectDropTarget(item))
        : item;
}

export const DraggableNavigationTreeItem: typeof NavigationTreeItem = DropTarget(
    NavigationTreeItemDragID,
    navigationTreeItemDropSource,
    navigationTreeItemDropTargetCollect
)(
    DragSource(
        NavigationTreeItemDragID,
        navigationTreeItemDragSource,
        navigationTreeItemDragSourceCollect
    )(NavigationTreeItem)
);
