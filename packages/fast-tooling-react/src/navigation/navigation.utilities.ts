import { cloneDeep, get, set } from "lodash-es";
import { ChildOptionItem } from "../data-utilities";
import {
    getDataLocationsOfChildren,
    mapSchemaLocationFromDataLocation,
    normalizeDataLocationToDotNotation,
    SchemaLocation,
} from "../data-utilities/location";
import {
    NavigationDataType,
    NavigationState,
    TreeNavigation,
    TreeNavigationItem,
} from "./navigation.props";
import { TargetPosition, getDataUpdatedWithSourceData } from "../data-utilities/relocate";
import { reactChildrenStringSchema } from "../form/controls/control.children.text";
import { PropertyKeyword } from "../form/utilities";
import { DataType } from "../data-utilities/types";

const propsKeyword: string = "props";
const childrenKeyword: string = "children";

export interface NavigationFromChildrenConfig {
    data: any;
    schema: any;
    dataLocation: string;
    childOptions: ChildOptionItem[];
}

export interface UpdateDataConfig {
    targetDataLocation: string;
    sourceDataLocation: string;
    data: unknown;
    type: NavigationDataType;
    direction: TargetPosition;
}

export interface ResolveDataConfig {
    data: unknown;
    dataLocation: string;
}

export interface ResolveTargetDataConfig extends ResolveDataConfig {
    direction: TargetPosition;
    type: NavigationDataType;
    sourceData: unknown;
}

export interface ReactComponentProps {
    [key: string]: any;
}

export interface ReactComponent {
    id: string;
    props: ReactComponentProps;
}

export type ReactPrimitiveChild = string;

export type ReactChildren = ReactComponent | ReactPrimitiveChild;

export type Children = ReactChildren | ReactChildren[];

export interface FindChildrenConfig {
    /**
     * The children for the parent
     */
    children: TreeNavigation;

    /**
     * The direct child items of the parent
     */
    items: string[];
}

export interface ComponentNavigation {
    /**
     * The components tree navigation
     */
    0: TreeNavigation;

    /**
     * The ids that are nested components
     */
    1: string[];

    /**
     * The data locations of children
     */
    2: string[];

    /**
     * The id of the component
     */
    3: string;
}

export interface ComponentDataNavigation {
    /**
     * The component datas tree navigation
     */
    0: TreeNavigation;

    /**
     * The childrens data locations
     */
    1: string[];

    /**
     * The root data location of the component
     */
    2: string;
}

export interface ComponentSchemaNavigation {
    /**
     * The component schemas tree navigation
     */
    0: TreeNavigation;

    /**
     * The ids that are children locations
     */
    1: string[];
}

export interface TreeNavigationConfig {
    /**
     * The component schemas tree navigation
     */
    0: TreeNavigation;

    /**
     * The id for the root component
     */
    1: string;
}

export interface PrimitiveNavigation {
    /**
     * The component schemas tree navigation
     */
    0: TreeNavigationItem;

    /**
     * The id of the primitive
     */
    1: string;
}

/**
 * Gets the navigation
 */
export function getNavigation(
    data: ReactComponentProps,
    schema: any,
    childOptions: ChildOptionItem[] = [],
    relativeDataLocation: string = "",
    dataLocation: string = "",
    navigation: TreeNavigation = {},
    childrenIndex?: number,
    parentId?: string,
    counter: number = 0
): TreeNavigationConfig {
    let updatedNavigation: TreeNavigation = navigation;

    const componentNavigation: ComponentNavigation = getNavigationFromComponent(
        data,
        schema,
        relativeDataLocation,
        dataLocation,
        childrenIndex,
        parentId,
        counter
    );

    updatedNavigation = componentNavigation[0];

    // If there are any children locations in
    // the component, find if they have data
    // associated with them and add them to
    // the navigation
    if (
        Array.isArray(componentNavigation[2]) &&
        componentNavigation[2].length > 0 &&
        Array.isArray(componentNavigation[1]) &&
        componentNavigation[1].length > 0
    ) {
        const navigationKeys: string[] = Object.keys(updatedNavigation);
        // Find the data matching these children
        for (const childrenDataLocation of componentNavigation[2]) {
            // Push each child data to the navigation item that is its parent and add
            // the navigation of that component
            const schemaLocationOfChildrenData: string = mapSchemaLocationFromDataLocation(
                childrenDataLocation,
                schema
            );
            const updatedParentId: string = navigationKeys.find(
                (navigationKey: string) => {
                    return (
                        updatedNavigation[navigationKey].schemaLocation ===
                        schemaLocationOfChildrenData
                    );
                }
            );
            if (updatedParentId !== undefined) {
                const childrenData: any = get(data, childrenDataLocation);

                if (typeof childrenData === "string") {
                    const navigationForPrimitiveChild: PrimitiveNavigation = getNavigationFromPrimitive(
                        childrenData,
                        childrenDataLocation,
                        dataLocation,
                        schema,
                        updatedParentId,
                        counter
                    );
                    // add this navigation item
                    updatedNavigation[navigationForPrimitiveChild[1]] =
                        navigationForPrimitiveChild[0];
                    addUniqueItemToList(
                        updatedNavigation[updatedParentId].items,
                        navigationForPrimitiveChild[1]
                    );
                } else {
                    const navigationForComponentChild: TreeNavigationConfig = getNavigation(
                        get(childrenData, propsKeyword, {}),
                        findSchema(childrenData, childOptions),
                        childOptions,
                        childrenDataLocation,
                        dataLocation + childrenDataLocation,
                        updatedNavigation,
                        childrenIndex,
                        updatedParentId,
                        counter + 1
                    );

                    updatedNavigation = Object.assign(
                        {},
                        updatedNavigation,
                        navigationForComponentChild[0]
                    );

                    addUniqueItemToList(
                        updatedNavigation[updatedParentId].items,
                        navigationForComponentChild[1]
                    );
                }
            }
        }
    }

    return [updatedNavigation, componentNavigation[3]];
}

export function getNavigationFromPrimitive(
    data: string,
    relativeDataLocation: string,
    dataLocation: string,
    schema: any,
    parentId: string,
    counter: number = 0
): PrimitiveNavigation {
    const id: string = normalizeId(dataLocation + relativeDataLocation) + counter;

    return [
        {
            self: id,
            relativeDataLocation,
            text: data,
            schemaLocation: mapSchemaLocationFromDataLocation(dataLocation, schema),
            type: NavigationDataType.primitiveChild,
            parent: parentId,
            items: [],
        },
        id,
    ];
}

/**
 * Gets the navigation from a component
 * The return type strings are the locations of children in the schema
 */
export function getNavigationFromComponent(
    data: ReactComponentProps,
    schema: any,
    relativeDataLocation: string = "",
    dataLocation: string = "",
    childrenIndex?: number,
    parentId?: string,
    counter: number = 0
): ComponentNavigation {
    let navigation: TreeNavigation = {};
    const dataNavigation: ComponentDataNavigation = getNavigationFromComponentData(
        data,
        schema,
        parentId,
        relativeDataLocation,
        dataLocation,
        childrenIndex,
        counter
    );
    const dataNavigationKeys: string[] = Object.keys(dataNavigation[0]);
    const schemaNavigation: ComponentSchemaNavigation = getNavigationFromComponentSchema(
        schema,
        dataLocation,
        dataNavigation[2],
        counter
    );
    const schemaNavigationKeys: string[] = Object.keys(schemaNavigation[0]);

    // Map all data to respective schema locations
    dataNavigationKeys.forEach((dataNavigationKey: string) => {
        navigation[dataNavigationKey] = dataNavigation[0][dataNavigationKey];
    });

    // Map all schema locations to child data
    schemaNavigationKeys.forEach((schemaNavigationKey: string) => {
        navigation[schemaNavigationKey] = schemaNavigation[0][schemaNavigationKey];
    });

    // Map all navigation items/parents
    navigation = updateParentRelationships(
        navigation,
        dataNavigationKeys.concat(schemaNavigationKeys)
    );

    return [navigation, schemaNavigation[1], dataNavigation[1], dataNavigation[2]];
}

function updateParentRelationships(
    navigation: TreeNavigation,
    navigationKeys: string[]
): TreeNavigation {
    navigationKeys.forEach((navigationKey: string) => {
        if (
            navigation[navigation[navigationKey].parent] &&
            navigation[navigationKey].parent
        ) {
            addUniqueItemToList(
                navigation[navigation[navigationKey].parent].items,
                navigationKey
            );
        }
    });

    return navigation;
}

/**
 * Gets tree navigation from a schema
 */
export function getNavigationFromComponentSchema(
    schema: any,
    dataLocation: string = "",
    parentId?: string,
    counter: number = 0
): ComponentSchemaNavigation {
    const navigation: TreeNavigation = {};
    const schemaLocationInstance: SchemaLocation = new SchemaLocation(schema);

    // find all possible children locations
    const childrenLocations: string[] = schemaLocationInstance.getChildrenLocations();

    childrenLocations.forEach(
        (childrenLocation: string): void => {
            const id: string = normalizeId(dataLocation + childrenLocation) + counter;

            navigation[id] = {
                self: id,
                type: NavigationDataType.children,
                text: get(schema, `${childrenLocation}.title`),
                relativeDataLocation: null,
                schemaLocation: childrenLocation,
                items: [],
            };
        }
    );

    // find all possible object locations
    const objectLocations: string[] = schemaLocationInstance.getObjectLocations();

    objectLocations.forEach(
        (objectLocation: string): void => {
            const id: string = normalizeId(dataLocation + objectLocation) + counter;

            // remove the root object location
            if (objectLocation !== "") {
                navigation[id] = {
                    self: id,
                    type: NavigationDataType.object,
                    text: get(schema, `${objectLocation}.title`),
                    relativeDataLocation: null,
                    schemaLocation: objectLocation,
                    items: [],
                };
            }
        }
    );

    // find all possible array locations
    const arrayLocations: string[] = schemaLocationInstance.getArrayLocations();

    arrayLocations.forEach(
        (arrayLocation: string): void => {
            const id: string = normalizeId(dataLocation + arrayLocation) + counter;

            navigation[id] = {
                self: id,
                type: NavigationDataType.array,
                text: get(schema, `${arrayLocation}.title`),
                relativeDataLocation: null,
                schemaLocation: arrayLocation,
                items: [],
            };
        }
    );

    const navigationKeys: string[] = Object.keys(navigation);

    // Sort navigation so that the longest are first
    navigationKeys.sort((firstKey: string, secondKey: string) => {
        return navigation[firstKey].schemaLocation.length >
            navigation[secondKey].schemaLocation.length
            ? -1
            : 1;
    });
    // Assign parents to each item
    navigationKeys.forEach((navigationKey: string) => {
        navigation[navigationKey].parent = findParentId(
            navigationKey,
            navigation,
            navigationKeys,
            parentId
        );
    });
    // Assign children items to each item
    navigationKeys.forEach((navigationKey: string) => {
        if (
            navigation[navigationKey].parent &&
            navigation[navigation[navigationKey].parent]
        ) {
            addUniqueItemToList(
                navigation[navigation[navigationKey].parent].items,
                navigationKey
            );
        }
    });

    return [
        navigation,
        navigationKeys.filter((navigationKey: string) => {
            return navigation[navigationKey].type === NavigationDataType.children;
        }),
    ];
}

/**
 * Ensure that every item added to a list is unique
 */
function addUniqueItemToList(list: string[], item: string): void {
    if (list.indexOf(item) === -1) {
        list.push(item);
    }
}

/**
 * Find a parent for a navigation item
 * @param navigationItemKeys - keys should be pre-sorted from longest schemaLocation to shortest
 * to ensure the closest parent is found
 */
function findParentId(
    childKey: string,
    navigation: TreeNavigation,
    navigationItemKeys: string[],
    rootParentId: string
): string {
    return (
        navigationItemKeys.find((navigationItemKey: string) => {
            return (
                navigation[childKey].schemaLocation.startsWith(
                    navigation[navigationItemKey].schemaLocation
                ) && childKey !== navigationItemKey
            );
        }) || rootParentId
    );
}

/**
 * Gets tree navigation from data
 */
export function getNavigationFromComponentData(
    data: ReactComponentProps,
    schema: any,
    parentId?: string,
    relativeDataLocation: string = "",
    dataLocation: string = "",
    childrenIndex?: number,
    counter: number = 0
): ComponentDataNavigation {
    const componentNavigation: TreeNavigationItem = getNavigationItemFromComponent(
        data,
        schema,
        relativeDataLocation,
        dataLocation,
        parentId,
        childrenIndex,
        counter
    );

    return [
        {
            [componentNavigation.self]: componentNavigation,
        },
        getDataLocationsOfChildren(schema, data, []),
        componentNavigation.self,
    ];
}

export function getNavigationItemFromComponent(
    data: ReactComponentProps,
    schema: any,
    relativeDataLocation: string,
    dataLocation: string,
    parentId?: string,
    index?: number,
    counter: number = 0
): TreeNavigationItem {
    const isString: boolean = typeof data === "string";
    const updatedRelativeDataLocation: string =
        typeof index === "number"
            ? `${relativeDataLocation}[${index}]${isString ? "" : ".props"}`
            : parentId === undefined
                ? ""
                : `${relativeDataLocation}${isString ? "" : ".props"}`;
    const id: string = normalizeId(dataLocation + updatedRelativeDataLocation) + counter;
    const navigationItem: TreeNavigationItem = {
        self: id,
        relativeDataLocation: updatedRelativeDataLocation,
        schemaLocation: NavigationDataType.component
            ? ""
            : mapSchemaLocationFromDataLocation(
                  getDataLocationNormalized(updatedRelativeDataLocation),
                  schema,
                  updatedRelativeDataLocation === ""
                      ? data
                      : get(data, updatedRelativeDataLocation)
              ),
        text: isString ? data : schema.title,
        type: isString ? NavigationDataType.primitiveChild : NavigationDataType.component,
        items: [],
    };

    if (parentId !== undefined) {
        navigationItem.parent = parentId;
    }

    return navigationItem;
}

function findSchema(component: ReactChildren, childOptions: ChildOptionItem[]): any {
    if (typeof component === "string") {
        return reactChildrenStringSchema;
    }

    return childOptions.find(
        (childOption: ChildOptionItem): any => {
            return childOption.schema.id === component.id;
        }
    ).schema;
}

/**
 * Gets a normalized source data location that can be used for setting/getting data
 */
export function getDataLocationNormalized(dataLocation: string): string {
    return dataLocation.endsWith(`.${propsKeyword}`)
        ? dataLocation.slice(0, -6)
        : dataLocation;
}

/**
 * Transform data before modifying it with source data
 * This is critical for data that is children which can
 * be either a string, object (representing a single component) or an array of either of these
 */
export function transformDataBeforeUpdate(
    data: any,
    dataLocation: string,
    dataType: NavigationDataType
): any {
    const updatedData: any = cloneDeep(data);

    if (dataType === NavigationDataType.children) {
        const targetData: any = get(updatedData, dataLocation);

        if (!Array.isArray(targetData) && targetData !== undefined) {
            set(updatedData, dataLocation, [targetData]);
        }
    }

    return updatedData;
}

/**
 * Normalizes the target data location based on the target navigation item
 */
export function normalizeTargetDataLocation(
    dataType: NavigationDataType,
    position: TargetPosition,
    dataLocation: string
): string {
    return dataType === NavigationDataType.component && position === TargetPosition.insert
        ? `${dataLocation}${dataLocation === "" ? "" : "."}children`
        : dataType === NavigationDataType.children
            ? dataLocation
            : dataLocation.replace(/\.props$/, "");
}

export function getFullDataLocation(
    navigation: TreeNavigation,
    navigationId: string,
    accumulatedDataLocation: string = ""
): string {
    let updatedAccumulatedDataLocation: string = accumulatedDataLocation;
    const hasParent: boolean = !!navigation[navigationId].parent;

    if (hasParent && navigation[navigationId].relativeDataLocation !== null) {
        const fullDataLocation: string = getFullDataLocation(
            navigation,
            navigation[navigationId].parent
        );
        updatedAccumulatedDataLocation += `${fullDataLocation}${
            fullDataLocation === "" ? "" : "."
        }${navigation[navigationId].relativeDataLocation}`;
    } else if (hasParent && navigation[navigationId].relativeDataLocation === null) {
        updatedAccumulatedDataLocation += getFullDataLocation(
            navigation,
            navigation[navigationId].parent
        );
    }

    return updatedAccumulatedDataLocation;
}

/**
 * Normalize the navigation ids so they can be used as keys
 * This should prevent any issue in the future that requires the use of
 * data locations concatenated by Object keys.
 */
function normalizeId(navigationId: string): string {
    return navigationId.replace(/(\[|\]|\.)/g, "");
}

export function getDragHoverState(
    navigation: TreeNavigation,
    targetDragHoverNavigationId: string,
    sourceDragHoverNavigationId: string,
    direction: TargetPosition
): Partial<NavigationState> {
    const state: Partial<NavigationState> = {
        dragHoverNavigationId: targetDragHoverNavigationId,
        dragHoverBeforeNavigationId:
            direction === TargetPosition.prepend ? targetDragHoverNavigationId : null,
        dragHoverAfterNavigationId:
            direction === TargetPosition.append ? targetDragHoverNavigationId : null,
        dragHoverCenterNavigationId:
            direction === TargetPosition.insert ? targetDragHoverNavigationId : null,
    };

    if (
        targetDragHoverNavigationId !== sourceDragHoverNavigationId &&
        navigation[targetDragHoverNavigationId].parent !== undefined
    ) {
        const updatedNavigation: TreeNavigation = cloneDeep(navigation);
        let targetParentNavigationId: string =
            updatedNavigation[targetDragHoverNavigationId].parent;

        // inset when the target is a component actually targets its children prop,
        // therefore, target the children prop and assign it as the parent instead
        if (
            direction === TargetPosition.insert &&
            updatedNavigation[targetDragHoverNavigationId].type ===
                NavigationDataType.component
        ) {
            targetParentNavigationId =
                updatedNavigation[targetDragHoverNavigationId].items.find(
                    (navigationId: string) => {
                        const locationSegments: string[] =
                            typeof updatedNavigation[navigationId].schemaLocation ===
                            "string"
                                ? updatedNavigation[navigationId].schemaLocation.split(
                                      "."
                                  )
                                : [];

                        return (
                            updatedNavigation[navigationId].type ===
                                NavigationDataType.children &&
                            locationSegments.find((locationSegment: string) => {
                                return locationSegment === "children";
                            }) !== undefined
                        );
                    }
                ) || updatedNavigation[targetDragHoverNavigationId].parent;
        }

        const adjacentIndex: number = updatedNavigation[
            targetParentNavigationId
        ].items.indexOf(targetDragHoverNavigationId);
        const currentIndex: number = updatedNavigation[
            updatedNavigation[sourceDragHoverNavigationId].parent
        ].items.indexOf(sourceDragHoverNavigationId);

        // remove the navigation from the current parent
        updatedNavigation[
            updatedNavigation[sourceDragHoverNavigationId].parent
        ].items = updatedNavigation[
            updatedNavigation[sourceDragHoverNavigationId].parent
        ].items.filter((navigationId: string) => {
            return navigationId !== sourceDragHoverNavigationId;
        });

        // The offset in the array if the target is the same as the source array
        const sameArrayIndexOffset: number =
            currentIndex > adjacentIndex &&
            navigation[sourceDragHoverNavigationId].parent ===
                navigation[targetDragHoverNavigationId].parent
                ? 1
                : 0;
        const newTargetIndex: number =
            direction === TargetPosition.append
                ? adjacentIndex + 1 + sameArrayIndexOffset
                : direction === TargetPosition.prepend
                    ? adjacentIndex + sameArrayIndexOffset
                    : 0;

        // update the navigation to the new parent
        updatedNavigation[sourceDragHoverNavigationId].parent = targetParentNavigationId;

        // add the source to the parent
        if (direction === TargetPosition.insert) {
            // TODO: determine what the location should be given that there are complex items
            updatedNavigation[targetParentNavigationId].items.splice(
                0,
                0,
                sourceDragHoverNavigationId
            );
        } else {
            updatedNavigation[
                updatedNavigation[sourceDragHoverNavigationId].parent
            ].items.splice(newTargetIndex, 0, sourceDragHoverNavigationId);
        }

        state.navigation = updatedNavigation;
    }

    return state;
}

export function getDragEndUpdatedData(
    navigation: TreeNavigation,
    draggingNavigationId: string,
    data: ReactComponentProps,
    relocatingData: ReactChildren
): ReactComponentProps {
    // determine the targets parent data location
    const parentSchemaLocationSegments: string[] = navigation[
        navigation[draggingNavigationId].parent
    ].schemaLocation.split(".");
    const propertyName: string = parentSchemaLocationSegments
        .filter((parentSchemaLocationSegment: string) => {
            return parentSchemaLocationSegment !== PropertyKeyword.reactProperties;
        })
        .join(".");
    const targetParentDataLocation: string = getFullDataLocation(
        navigation,
        navigation[draggingNavigationId].parent
    );
    const index: number | undefined = navigation[
        navigation[draggingNavigationId].parent
    ].items.indexOf(draggingNavigationId);
    const isArray: boolean =
        index !== -1 &&
        navigation[navigation[draggingNavigationId].parent].items.length > 2;
    const targetDataLocation: string = `${targetParentDataLocation}${
        targetParentDataLocation === "" ? "" : "."
    }${propertyName}${isArray ? `[${index}]` : ""}`;

    // add the source data
    const updatedData: any = getDataUpdatedWithSourceData({
        targetDataLocation,
        targetDataType: isArray ? DataType.array : DataType.children,
        targetPosition: isArray ? TargetPosition.prepend : TargetPosition.insert,
        sourceData: relocatingData,
        data: isArray ? data : [data, get(data, targetDataLocation)],
    });

    return updatedData;
}
