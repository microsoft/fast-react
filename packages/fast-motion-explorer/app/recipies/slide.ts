import {
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
} from "@microsoft/fast-components-styles-msft";
import { formatTransition } from "./utilities";
import { StandardLonghandPropertiesHyphen } from "csstype";

/**
 * Obtain the slide animation duration as a product
 * of the slide distance in pixels
 */
export function slideDuration(distance: number): DesignSystemResolver<number> {
    return (designSystem: DesignSystem): number =>
        duration(150 + distance / 5)(designSystem);
}

/**
 * The CSS transition property values as a product of the distance being moved
 * and the properties to transition
 */
export function slideTransition(
    distance: number
): ReturnType<ReturnType<typeof formatTransition>> {
    return formatTransition(slideDuration(distance))(bezier)
}
