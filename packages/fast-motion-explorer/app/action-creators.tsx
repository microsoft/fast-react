import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import { UPDATE_ANIMATION, UPDATE_DESIGN_SYSTEM } from "./actions";
import { Animations } from "./state";

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
