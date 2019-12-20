export enum NavigationDataType {
    object = "object",
    array = "array",
    children = "children",
    component = "component",
    primitiveChild = "primitiveChild",
}

export interface TreeNavigation {
    /**
     * A dictionary of items
     */
    [key: string]: TreeNavigationItem;
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
