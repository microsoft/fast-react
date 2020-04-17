import {
    neutralForegroundActiveDelta,
    neutralForegroundFocusDelta,
    neutralForegroundHoverDelta,
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

export const neutralForeground: SwatchFamilyResolver = colorRecipeFactory(
    accessibleAlgorithm(
        neutralPalette,
        14,
        0,
        neutralForegroundHoverDelta,
        neutralForegroundActiveDelta,
        neutralForegroundFocusDelta
    )
);

export const neutralForegroundRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.rest,
    neutralForeground
);
export const neutralForegroundHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.hover,
    neutralForeground
);
export const neutralForegroundActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.active,
    neutralForeground
);
export const neutralForegroundFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.focus,
    neutralForeground
);

export const neutralForegroundRestCustomProperty = "var(--neutral-foreground-rest)";
export const neutralForegroundHoverCustomProperty = "var(--neutral-foreground-hover)";
export const neutralForegroundActiveCustomProperty = "var(--neutral-foreground-active)";
export const neutralForegroundFocusCustomProperty = "var(--neutral-foreground-focus)";

export const neutralForegroundRestDefinition = {
    name: "neutral-foreground-rest",
    value: neutralForegroundRest,
};
export const neutralForegroundHoverDefinition = {
    name: "neutral-foreground-hover",
    value: neutralForegroundHover,
};
export const neutralForegroundActiveDefinition = {
    name: "neutral-foreground-active",
    value: neutralForegroundActive,
};
export const neutralForegroundFocusDefinition = {
    name: "neutral-foreground-focus",
    value: neutralForegroundFocus,
};
