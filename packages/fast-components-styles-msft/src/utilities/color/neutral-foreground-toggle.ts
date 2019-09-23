import { black, white } from "./color-constants";
import { DesignSystem } from "../../design-system";
import {
    colorRecipeFactory,
    curriedContrast,
    Swatch,
    SwatchRecipe,
    SwatchResolver,
} from "./common";
import { neutralFillToggleRest } from "./neutral-fill-toggle";
import { backgroundColor } from "../design-system";

/**
 * Function to derive neutralForegroundToggle from an input background and target contrast ratio
 */
const contrastFn: (value: string) => number = curriedContrast(white);

function neutralForegroundToogleAlgorithmFactory(
    targetContrast: number
): (designSystem: DesignSystem) => Swatch {
    return (designSystem: DesignSystem): Swatch => {
        return contrastFn(backgroundColor(designSystem)) >= targetContrast
            ? white
            : black;
    };
}

/**
 * Toggle text for normal sized text, less than 18pt normal weight
 */
export const neutralForegroundToggle: SwatchRecipe = colorRecipeFactory(
    neutralForegroundToogleAlgorithmFactory(4.5)
);

/**
 * Toggle text for large sized text, greater than 18pt or 16pt and bold
 */
export const neutralForegroundToggleLarge: SwatchRecipe = colorRecipeFactory(
    neutralForegroundToogleAlgorithmFactory(3)
);
