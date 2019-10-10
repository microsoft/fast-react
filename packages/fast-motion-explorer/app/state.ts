import { Action, createStore } from "redux";
import {
    DesignSystem,
    DesignSystemDefaults,
} from "@microsoft/fast-components-styles-msft";
import { UPDATE_ANIMATION, UPDATE_DESIGN_SYSTEM } from "./actions";
import { merge } from "lodash-es";

export enum Animations {
    revealDismiss = "reveal-dismiss",
    slide = "slide",
    elevate = "elevate",
    expand = "expand"
}

export interface AppState {
    /**
     * The root level design system
     */
    designSystem: DesignSystem;

    /**
     * Animation
     */
    animation: Animations;
}


/**
 * Root reducer
 */
function rootReducer(state: AppState, action: any): AppState {
    switch (action.type) {
        case UPDATE_DESIGN_SYSTEM:
            return merge({}, state, { designSystem: action.data })
        case UPDATE_ANIMATION:
            return merge({}, state, { animation: action.data })
    }

    return state;
}

export const store: any = createStore(rootReducer, {
    designSystem: DesignSystemDefaults,
    animation: Animations.revealDismiss
});
