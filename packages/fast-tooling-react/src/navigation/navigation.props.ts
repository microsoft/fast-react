import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { ChildOptionItem } from "../data-utilities";
import { NavigationClassNameContract } from "./navigation.style";
import { ReactComponentProps } from "./navigation.utilities";

export enum NavigationDataType {
    object = "object",
    array = "array",
    children = "children",
    component = "component",
    primitiveChild = "primitiveChild",
}

export interface NavigationState {
    /**
     * The navigation data
     */
    navigation: TreeNavigation;

    /**
     * A copy of the prop data
     * used so that source data can be removed
     * when drag starts and added when drag ends
     */
    data: ReactComponentProps;

    expandedNavigationIds: string[];

    /**
     * The root items id
     */
    rootNavigationItemId: string;

    /**
     * The data currently being moved
     */
    relocatingData: any;

    /**
     * The active navigation item id
     */
    activeNavigationItemId: string;

    /**
     * The dragging navigation id
     */
    draggingNavigationId: null | string;

    /**
     * The dragging items source data location
     */
    draggingSourceDataLocation: null | string;

    /**
     * The hovered tree item
     */
    dragHoverNavigationId: null | string;

    /**
     * The hovered location before
     */
    dragHoverBeforeNavigationId: null | string;

    /**
     * The hovered location after
     */
    dragHoverAfterNavigationId: null | string;

    /**
     * The hovered location center
     */
    dragHoverCenterNavigationId: null | string;
}

export interface TreeNavigationItem {
    /**
     * The ID for this item
     */
    self: string;

    /**
     * The ID for the parent of this item
     */
    parent?: string;

    /**
     * The relative data location
     */
    relativeDataLocation: string;

    /**
     * The schema location
     */
    schemaLocation: string;

    /**
     * The display text
     */
    text: string;

    /**
     * The data type, this will result in a different
     * icons used
     */
    type: NavigationDataType;

    /**
     * The ids belonging to the text as a dropdown
     */
    items: string[];
}

export interface TreeNavigation {
    /**
     * A dictionary of items
     */
    [key: string]: TreeNavigationItem;
}

export interface NavigationHandledProps
    extends ManagedClasses<NavigationClassNameContract> {
    /**
     * The JSON schema
     */
    schema: any;

    /**
     * The data mapped to the schema
     */
    data: ReactComponentProps;

    /**
     * The React child options
     */
    childOptions?: ChildOptionItem[];

    /**
     * The data location if the component is controlled
     */
    dataLocation?: string;

    /**
     * The location update
     */
    onLocationUpdate?: (dataLocation: string) => void;

    /**
     * If navigation items should enable drag to re-order. For this to work,
     * the parent application will need to ensure the Navigation component is
     * wrapped with a react-dnd backend. For more information on react-dnd backends,
     * see http://react-dnd.github.io/react-dnd/docs/overview
     */
    dragAndDropReordering?: boolean;

    /**
     * The onChange callback for updating the data
     */
    onChange?: (data: any, dataLocation?: string) => void;
}

export type NavigationProps = NavigationHandledProps;
