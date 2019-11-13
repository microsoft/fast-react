import {
    DesignSystem,
    DesignSystemDefaults,
} from "@microsoft/fast-components-styles-msft";
import { merge } from "lodash-es";
import { createStore, Store } from "redux";
import {
    ADD_VISIBLE_RELATIVE_MOTION_TYPE,
    REMOVE_VISIBLE_RELATIVE_MOTION_TYPE,
    UPDATE_ANIMATION,
    UPDATE_DESIGN_SYSTEM,
} from "./actions";

export enum Animations {
    revealDismiss = "reveal-dismiss",
    slide = "slide",
    elevate = "elevate",
    expand = "expand",
}

export const relativeMotionPresets: {
    none: number;
    minimal: number;
    subtle: number;
    default: number;
    extra: number;
    expressive: number;
} = {
    none: 0,
    minimal: 0.2,
    subtle: 0.4,
    default: 0.6,
    extra: 0.8,
    expressive: 1,
};

export type RelativeMotionExampleTypes = keyof (typeof relativeMotionPresets) | "custom";
export const allRelativeMotionExampleTypes: RelativeMotionExampleTypes[] = [
    "custom",
].concat(Object.keys(relativeMotionPresets)) as RelativeMotionExampleTypes[];

export interface AppState {
    /**
     * The root level design system
     */
    designSystem: DesignSystem;

    /**
     * Animation
     */
    animation: Animations;

    /**
     * The animation speed examples being shown
     */
    activeRelativeMotionExamples: RelativeMotionExampleTypes[];
}

/**
 * Root reducer
 */
function rootReducer(state: AppState, action: any): AppState {
    switch (action.type) {
        case UPDATE_DESIGN_SYSTEM:
            return merge({}, state, { designSystem: action.data });
        case UPDATE_ANIMATION:
            return merge({}, state, { animation: action.data });
        case ADD_VISIBLE_RELATIVE_MOTION_TYPE:
            // Ensure we don't have duplicates
            return !state.activeRelativeMotionExamples.includes(action.value)
                ? Object.assign({}, state, {
                      activeRelativeMotionExamples: state.activeRelativeMotionExamples.concat(
                          action.value
                      ),
                  })
                : state;
        case REMOVE_VISIBLE_RELATIVE_MOTION_TYPE:
            return Object.assign({}, state, {
                activeRelativeMotionExamples: state.activeRelativeMotionExamples.filter(
                    (type: RelativeMotionExampleTypes): boolean => type !== action.value
                ),
            });
    }

    return state;
}

export const store: Store<AppState> = createStore(rootReducer, {
    designSystem: DesignSystemDefaults,
    animation: Animations.revealDismiss,
    activeRelativeMotionExamples: ["default"],
});
