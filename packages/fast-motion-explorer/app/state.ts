import { Action, createStore } from "redux";
import { ColorRGBA64 } from "@microsoft/fast-colors";
import { createColorPalette, DesignSystem, DesignSystemDefaults  } from "@microsoft/fast-components-styles-msft";

export interface AppState {
    /**
     * The root level design system
     */
    designSystem: DesignSystem;
}

export interface Action {
    type: symbol;
}

function rootReducer(state: AppState, action: any): AppState {
    return state;
}

export const store: any = createStore(rootReducer, {
    designSystem: DesignSystemDefaults,
});

