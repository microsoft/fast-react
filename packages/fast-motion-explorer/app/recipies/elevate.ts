import {
    applyElevation,
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
    ElevationMultiplier,
} from "@microsoft/fast-components-styles-msft";
import { CSSRules } from "@microsoft/fast-jss-manager-react";
import { formatTransition } from "./utilities";

const elevateDuration: DesignSystemResolver<number> = (
    designSystem: DesignSystem
): number => duration(designSystem);

export function elevateToProperties(
    elevation: ElevationMultiplier
): CSSRules<DesignSystem> {
    return applyElevation(elevation);
}

/**
 * Alias to elevateToProperties since these do the same thing
 */
export const elevateFromProperties: typeof elevateToProperties = elevateToProperties;

export const elevateTransition: DesignSystemResolver<string> = formatTransition(
    elevateDuration
)(bezier)("box-shadow");
