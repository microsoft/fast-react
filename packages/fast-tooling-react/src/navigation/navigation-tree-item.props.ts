import { NavigationDataType } from "./navigation.props";
import { TargetPosition } from "../data-utilities/relocate";

export interface NavigationTreeItemProps
    extends NavigationTreeItemDragSourceCollectedProps,
        NavigationTreeItemDropTargetCollectedProps {
    /**
     * The React children
     */
    children?: React.ReactNode;

    /**
     * The class
     */
    className: (dragging: boolean) => string;

    /**
     * The class for the content
     */
    contentClassName: string;

    /**
     * The class for the expand trigger
     */
    expandTriggerClassName: string;

    /**
     * A string representing the ID corresponding to a navigation dictionary
     */
    navigationId: string;

    /**
     * The expanded state
     */
    expanded: boolean;

    /**
     * The click handler for expanding an item
     */
    handleClick: React.MouseEventHandler<HTMLElement>;

    /**
     * The click handler for selecting an item
     */
    handleSelectionClick: React.MouseEventHandler<HTMLElement>;

    /**
     * The keyDown handler
     */
    handleKeyDown: React.KeyboardEventHandler<HTMLElement>;

    /**
     * The text used for the tree item
     */
    text: string;

    /**
     * The type of data this tree item represents
     */
    type: NavigationDataType;

    /**
     * The drag hover state
     */
    dragHover: boolean;

    /**
     * The drag hover before state
     */
    dragHoverBefore: boolean;

    /**
     * The drag hover after state
     */
    dragHoverAfter: boolean;

    /**
     * The hover callback for dragging
     */
    onDragHover: (
        targetNavigationId: string,
        sourceNavigationId: string,
        direction: TargetPosition
    ) => void;

    /**
     * The handler for beginning to drag item
     */
    onDragStart: (navigationId: string, type: NavigationDataType) => void;

    /**
     * The callback for drag end
     */
    onDragEnd: () => void;
}

export interface NavigationTreeItemDragSourceCollectedProps {
    connectDragSource?: (el: JSX.Element) => JSX.Element;
    isDragging?: boolean;
}

export interface NavigationTreeItemDropTargetCollectedProps {
    connectDropTarget?: (el: JSX.Element) => JSX.Element;
    canDrop?: boolean;
    isOver?: boolean;
}

export interface NavigationTreeItemDragObject {
    navigationId: string;
}
