import {
    DesignSystem,
    DesignSystemDefaults,
} from "@microsoft/fast-components-styles-msft";
import { merge } from "lodash-es";
import { createStore, Store } from "redux";
import { UPDATE_ANIMATION, UPDATE_DESIGN_SYSTEM } from "./actions";

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

export type RelativeMotionExampleTypes = keyof (typeof relativeMotionPresets) | "custom"

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
    }

    return state;
}

export const store: Store<AppState> = createStore(rootReducer, {
    designSystem: DesignSystemDefaults,
    animation: Animations.revealDismiss,
    activeRelativeMotionExamples: ["custom", "expressive"]
});
