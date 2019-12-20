import { NavigationState } from "./navigation.props";
import { NavigationDataType, TreeNavigation } from "../message-system/navigation.props";
import { TargetPosition } from "../data-utilities/relocate";
import { cloneDeep } from "lodash-es";

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
