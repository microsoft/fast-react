import {
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
    relativeMotion,
} from "@microsoft/fast-components-styles-msft";
import { CSSRules } from "@microsoft/fast-jss-manager-react";
import { formatTransition } from "./utilities";
import { format } from "@microsoft/fast-jss-utilities";

/**
 * The duration of the dismiss animation
 */
export const dismissDuration: DesignSystemResolver<number> = duration(50);

/**
 * The CSS Transition property value for a dismiss transition
 */
export const dismissTransition: DesignSystemResolver<string> = formatTransition(
    dismissDuration
)(bezier)("transform", "opacity", "box-shadow");

/**
 * The CSS transform property value
 */
export function dismissTransform(dimension: number): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        return `scale(${(100 - 2000 / dimension - relativeMotion(designSystem) * 20) /
            100})`;
    };
}

/**
 * The CSS properties to be applied to dismiss
 */
export function dismissToProperties(size: number): CSSRules<DesignSystem> {
    return {
        opacity: "0",
        transform: dismissTransform(size),
        boxShadow: "none",
    };
}
