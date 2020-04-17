import {
    neutralFillToggleActiveDelta,
    neutralFillToggleFocusDelta,
    neutralFillToggleHoverDelta,
    neutralPalette,
} from "../design-system";
import {
    colorRecipeFactory,
    SwatchFamilyResolver,
    swatchFamilyToSwatchRecipeFactory,
    SwatchFamilyType,
    SwatchRecipe,
} from "./common";
import { accessibleAlgorithm } from "./accessible-recipe";

export const neutralFillToggle: SwatchFamilyResolver = colorRecipeFactory(
    accessibleAlgorithm(
        neutralPalette,
        4.5,
        0,
        neutralFillToggleHoverDelta,
        neutralFillToggleActiveDelta,
        neutralFillToggleFocusDelta
    )
);

export const neutralFillToggleRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.rest,
    neutralFillToggle
);
export const neutralFillToggleHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.hover,
    neutralFillToggle
);
export const neutralFillToggleActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.active,
    neutralFillToggle
);
export const neutralFillToggleFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.focus,
    neutralFillToggle
);

export const neutralFillToggleRestCustomProperty = "var(--neutral-fill-toggle-rest)";
export const neutralFillToggleHoverCustomProperty = "var(--neutral-fill-toggle-hover)";
export const neutralFillToggleActiveCustomProperty = "var(--neutral-fill-toggle-active)";
export const neutralFillToggleFocusCustomProperty = "var(--neutral-fill-toggle-focus)";

export const neutralFillToggleRestDefinition = {
    name: "neutral-fill-toggle-rest",
    value: neutralFillToggleRest,
};
export const neutralFillToggleHoverDefinition = {
    name: "neutral-fill-toggle-hover",
    value: neutralFillToggleHover,
};
export const neutralFillToggleActiveDefinition = {
    name: "neutral-fill-toggle-active",
    value: neutralFillToggleActive,
};
export const neutralFillToggleFocusDefinition = {
    name: "neutral-fill-toggle-focus",
    value: neutralFillToggleFocus,
};
