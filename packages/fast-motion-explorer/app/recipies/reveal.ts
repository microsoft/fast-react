import {
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
    relativeMotion,
} from "@microsoft/fast-components-styles-msft";
import { toMs, toPx } from "@microsoft/fast-jss-utilities";
import { CSSRules } from "@microsoft/fast-jss-manager-react";
import { formatTransition } from "./utilities";

/**
 * Reveal
 */
export const revealDuration: DesignSystemResolver<number> = duration(150);

/**
 * The Reveal CSS transform value
 */
export function revealTransform(dimension: number): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const scaledMotion: number = relativeMotion(designSystem) * 20;
        const scale: number = 100 - 2000 / dimension - scaledMotion;

        return `translateX(${toPx(scaledMotion)}) scale(${scale / 100})`;
    };
}

/**
 * The CSS transition property value for a reveal transition
 */
export const revealTransition: DesignSystemResolver<string> = formatTransition(revealDuration)(bezier)("transform", "opacity", "box-shadow") 



export function revealFromProperties(size: number): CSSRules<DesignSystem> {
    return {
        opacity: "0",
        "box-shadow": "none",
        transform: revealTransform(size), // How do we tie this to props?
    }
}

export const revealToProperties: CSSRules<DesignSystem> = {
    transition: revealTransition,
    transform: "translateX(0) scale(1)",
    opacity: "1",
};

