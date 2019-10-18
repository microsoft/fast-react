import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import {
    ADD_VISIBLE_RELATIVE_MOTION_TYPE,
    REMOVE_VISIBLE_RELATIVE_MOTION_TYPE,
    UPDATE_ANIMATION,
    UPDATE_DESIGN_SYSTEM,
} from "./actions";
import { Animations, RelativeMotionExampleTypes } from "./state";

/**
 * Action creators
 */
export function updateDesignSystem<T>(
    key: keyof DesignSystem,
    value: T
): { type: string; data: Partial<DesignSystem> } {
    return {
        type: UPDATE_DESIGN_SYSTEM,
        data: { [key]: value },
    };
}

export function updateAnimation(
    animation: Animations
): { type: string; data: Animations } {
    return { type: UPDATE_ANIMATION, data: animation };
}

export function addActiveRelativeMotionType(
    value: RelativeMotionExampleTypes
): { type: typeof ADD_VISIBLE_RELATIVE_MOTION_TYPE; value: RelativeMotionExampleTypes } {
    return {
        type: ADD_VISIBLE_RELATIVE_MOTION_TYPE,
        value,
    };
}

export function removeActiveRelativeMotionType(
    value: RelativeMotionExampleTypes
): {
    type: typeof REMOVE_VISIBLE_RELATIVE_MOTION_TYPE;
    value: RelativeMotionExampleTypes;
} {
    return {
        type: REMOVE_VISIBLE_RELATIVE_MOTION_TYPE,
        value,
    };
}
