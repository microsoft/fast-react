import { DesignSystem, DesignSystemResolver } from "../../design-system";
import {
    findClosestSwatchIndex,
    findSwatchIndex,
    getSwatch,
    isDarkMode,
    Palette,
    swatchByContrast,
} from "./palette";
import {
    colorRecipeFactory,
    Swatch,
    SwatchFamily,
    SwatchFamilyResolver,
    swatchFamilyToSwatchRecipeFactory,
    SwatchFamilyType,
    SwatchRecipe,
} from "./common";
import {
    accentBaseColor,
    accentForegroundActiveDelta,
    accentForegroundHoverDelta,
    accentForegroundRestDelta,
    accentPalette,
    backgroundColor,
} from "../design-system";

function accentForegroundAlgorithm(
    contrastTarget: number
): DesignSystemResolver<SwatchFamily> {
    const contrastFn: (contrast: number) => boolean = (contrast: number): boolean =>
        contrast >= contrastTarget;
    const curriedSwatchByContrast: ReturnType<
        ReturnType<typeof swatchByContrast>
    > = swatchByContrast(backgroundColor)(accentPalette);

    return (designSystem: DesignSystem): SwatchFamily => {
        const palette: Palette = accentPalette(designSystem);
        const accent: Swatch = accentBaseColor(designSystem);
        const accentIndex: number = findClosestSwatchIndex(accentPalette, accent)(
            designSystem
        );

        const restDelta: number = accentForegroundRestDelta(designSystem);
        const hoverDelta: number = accentForegroundHoverDelta(designSystem);
        const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;
        const startIndex: number =
            accentIndex +
            (direction === 1
                ? Math.min(restDelta, hoverDelta)
                : Math.max(direction * restDelta, direction * hoverDelta));

        const accessibleSwatch: Swatch = curriedSwatchByContrast(
            () => startIndex // Begin searching based on accent index, direction, and deltas
        )(
            () => direction // Search direction based on light/dark mode
        )(contrastFn)(
            designSystem // Pass the design system
        );

        // One of these will be rest, the other will be hover. Depends on the offsets and the direction.
        const accessibleIndex1: number = findSwatchIndex(accentPalette, accessibleSwatch)(
            designSystem
        );
        const accessibleIndex2: number =
            accessibleIndex1 + direction * Math.abs(restDelta - hoverDelta);

        const indexOneIsRestState: boolean =
            direction === 1
                ? restDelta < hoverDelta
                : direction * restDelta > direction * hoverDelta;

        const restIndex: number = indexOneIsRestState
            ? accessibleIndex1
            : accessibleIndex2;
        const hoverIndex: number = indexOneIsRestState
            ? accessibleIndex2
            : accessibleIndex1;

        const activeIndex: number = restIndex + direction * accentForegroundActiveDelta(designSystem);

        return {
            rest: getSwatch(restIndex, palette),
            hover: getSwatch(hoverIndex, palette),
            active: getSwatch(activeIndex, palette),
        };
    };
}

export const accentForeground: SwatchFamilyResolver = colorRecipeFactory(
    accentForegroundAlgorithm(4.5)
);
export const accentForegroundLarge: SwatchFamilyResolver = colorRecipeFactory(
    accentForegroundAlgorithm(3)
);

export const accentForegroundRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.rest,
    accentForeground
);
export const accentForegroundHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.hover,
    accentForeground
);
export const accentForegroundActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.active,
    accentForeground
);

export const accentForegroundLargeRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.rest,
    accentForegroundLarge
);
export const accentForegroundLargeHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.hover,
    accentForegroundLarge
);
export const accentForegroundLargeActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.active,
    accentForegroundLarge
);
