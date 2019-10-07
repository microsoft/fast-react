import { Action, createStore } from "redux";
import {
    DesignSystem,
    DesignSystemDefaults,
} from "@microsoft/fast-components-styles-msft";
import { UPDATE_DESIGN_SYSTEM } from "./actions";
import { merge } from "lodash-es";


export interface AppState {
    /**
     * The root level design system
     */
    designSystem: DesignSystem;
}

function rootReducer(state: AppState, action: any): AppState {
    switch (action.type) {
        case UPDATE_DESIGN_SYSTEM:
            return merge({}, state, { designSystem: action.data })
    }

    return state;
}

export const store: any = createStore(rootReducer, {
    designSystem: DesignSystemDefaults,
});
