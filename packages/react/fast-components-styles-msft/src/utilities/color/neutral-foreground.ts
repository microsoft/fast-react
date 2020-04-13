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

// export const neutralForeground: SwatchFamilyResolver = colorRecipeFactory(
//     accessibleAlgorithm(
//         neutralPalette,
//         14,
//         0,
//         neutralForegroundHoverDelta,
//         neutralForegroundActiveDelta,
//         neutralForegroundFocusDelta
//     )
// );

// export const neutralForegroundRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
//     SwatchFamilyType.rest,
//     neutralForeground
// );
// export const neutralForegroundHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
//     SwatchFamilyType.hover,
//     neutralForeground
// );
// export const neutralForegroundActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
//     SwatchFamilyType.active,
//     neutralForeground
// );
// export const neutralForegroundFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
//     SwatchFamilyType.focus,
//     neutralForeground
// );

export const neutralForegroundRest = "var(--neutral-foreground-rest)";
export const neutralForegroundHover = "var(--neutral-foreground-hover)";
export const neutralForegroundActive = "var(--neutral-foreground-active)";
export const neutralForegroundFocus = "var(--neutral-foreground-focus)";
