import { DesignSystem } from "@microsoft/fast-components-styles-msft";
/**
 * Action types
 */
export const UPDATE_DESIGN_SYSTEM: string = "__UPDATE_DESIGN_SYSTEM__";

/**
 * Action creators
 */
export function updateDesignSystem<T>(
    key: keyof DesignSystem,
    value: T
): { type: string; data: Partial<DesignSystem> } {
    return {
        type: UPDATE_DESIGN_SYSTEM,
        data: { [key]: value }
    };
}
