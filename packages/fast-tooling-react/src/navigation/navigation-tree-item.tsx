import React, { useImperativeHandle, useRef } from "react";
import { XYCoord } from "dnd-core";
import { NavigationDataType, TreeNavigation } from "./navigation.props";
import {
    NavigationTreeItemDragObject,
    NavigationTreeItemDragSourceCollectedProps,
    NavigationTreeItemDropTargetCollectedProps,
    NavigationTreeItemProps,
} from "./navigation-tree-item.props";
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
import { TargetPosition } from "../data-utilities/relocate";

export const NavigationTreeItemDragId: symbol = Symbol();

export const navigationTreeItemDragSource: DragSourceSpec<
    NavigationTreeItemProps,
    NavigationTreeItemDragObject
> = {
    beginDrag: (props: NavigationTreeItemProps): NavigationTreeItemDragObject => {
        props.onDragStart(props.navigationId, props.type);

        return {
            navigationId: props.navigationId,
        };
    },
    endDrag: (props: NavigationTreeItemProps): void => {
        props.onDragEnd();
    },
};

export const navigationTreeItemDropSource: DropTargetSpec<NavigationTreeItemProps> = {
    hover: (
        props: NavigationTreeItemProps,
        monitor: DropTargetMonitor,
        component: any
    ): void => {
        const item: any = monitor.getItem();

        if (
            monitor.isOver({ shallow: true }) &&
            props.type === NavigationDataType.children
        ) {
            props.onDragHover(
                props.navigationId,
                item.navigationId,
                TargetPosition.insert
            );
        } else if (
            monitor.isOver({ shallow: true }) &&
            (props.type === NavigationDataType.component ||
                props.type === NavigationDataType.primitiveChild)
        ) {
            if (!component) {
                return null;
            }

            const node: HTMLDivElement = component.getNode();

            if (!node) {
                return null;
            }

            const hoverBoundingRect: ClientRect | DOMRect = node.getBoundingClientRect();
            const clientOffset: XYCoord | null = monitor.getClientOffset(); // mouse position
            const hoverClientY: number = clientOffset.y - hoverBoundingRect.top; // pixels from the top
            const direction: TargetPosition =
                hoverClientY < 5
                    ? TargetPosition.prepend
                    : hoverClientY > hoverBoundingRect.height - 5
                        ? TargetPosition.append
                        : TargetPosition.insert;

            props.onDragHover(props.navigationId, item.navigationId, direction);
        }
    },
};

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
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
    };
};

interface NavigationTreeItemInstance {
    getNode(): HTMLSpanElement | null;
}

const NavigationTreeItem: React.RefForwardingComponent<
    HTMLSpanElement,
    NavigationTreeItemProps
> = React.forwardRef(
    (props: NavigationTreeItemProps, ref: React.RefObject<HTMLDivElement>) => {
        const elementRef: any = useRef(null);

        useImperativeHandle<{}, NavigationTreeItemInstance>(
            ref,
            (): NavigationTreeItemInstance => ({
                getNode: (): HTMLDivElement => elementRef.current,
            })
        );

        const item: JSX.Element =
            props.children !== undefined ? (
                <div
                    className={props.className(props.isDragging)}
                    role={"treeitem"}
                    ref={elementRef}
                    aria-expanded={props.expanded}
                    onKeyDown={props.handleKeyDown}
                >
                    <span
                        className={props.contentClassName}
                        onClick={props.handleSelectionClick}
                        onKeyDown={props.handleKeyDown}
                        tabIndex={0}
                        data-navigationid={props.navigationId}
                    >
                        <button
                            className={props.expandTriggerClassName}
                            onClick={props.handleClick}
                        />
                        {props.text}
                    </span>
                    {props.children}
                </div>
            ) : (
                <div className={props.className(props.isDragging)} ref={elementRef}>
                    <a
                        className={props.contentClassName}
                        role={"treeitem"}
                        data-navigationid={props.navigationId}
                        href={"#"}
                        onClick={props.handleClick}
                        onKeyDown={props.handleKeyDown}
                        tabIndex={0}
                    >
                        {props.text}
                    </a>
                </div>
            );

        const canDragAndDrop: boolean =
            typeof props.connectDropTarget === "function" &&
            typeof props.connectDragSource === "function";

        return canDragAndDrop &&
            (props.type === NavigationDataType.component ||
                props.type === NavigationDataType.primitiveChild)
            ? props.connectDragSource(props.connectDropTarget(item))
            : canDragAndDrop && props.type === NavigationDataType.children
                ? props.connectDropTarget(item)
                : item;
    }
);

export { NavigationTreeItem };

/*
 * The type returned by DropTarget is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
export const DraggableNavigationTreeItem = DropTarget(
    NavigationTreeItemDragId,
    navigationTreeItemDropSource,
    navigationTreeItemDropTargetCollect
)(
    DragSource(
        NavigationTreeItemDragId,
        navigationTreeItemDragSource,
        navigationTreeItemDragSourceCollect
    )(NavigationTreeItem)
);
type DraggableNavigationTreeItem = InstanceType<typeof DraggableNavigationTreeItem>;
