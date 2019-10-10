import {
    applyElevation,
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
    ElevationMultiplier,
    relativeMotion,
} from "@microsoft/fast-components-styles-msft";
import { toMs, toPx } from "@microsoft/fast-jss-utilities";
import { CSSRules } from "../../fast-jss-manager/dist";

/**
 * Reveal
 */


export const revealDuration: DesignSystemResolver<number> = duration(150);

export function revealTransform(dimension: number): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const scaledMotion: number = relativeMotion(designSystem) * 20;
        const scale: number = 100 - 2000 / dimension - scaledMotion;

        return `translateX(${toPx(scaledMotion)}) scale(${scale / 100})`;
    };
}

export function revealTransition(designSystem: DesignSystem): string {
    return ["transform", "opacity", "box-shadow"]
        .map(
            (value: string) =>
                `${value} ${toMs(revealDuration(designSystem))} ${bezier(designSystem)}`
        )
        .join(",");
}

/**
 * Dismiss
 */
export function dismissTransform(dimension: number): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const scaledMotion: number = relativeMotion(designSystem) * 20;
        const scale: number = 100 - 2000 / dimension - scaledMotion;

        return `scale(${scale / 100})`;
    };
}

export const dismissDuration: DesignSystemResolver<number> = duration(50);
export function dismissTransition(designSystem: DesignSystem): string {
    return ["transform", "opacity", "box-shadow"]
        .map(
            (value: string) =>
                `${value} ${toMs(dismissDuration(designSystem))} ${bezier(designSystem)}`
        )
        .join(",");
}

/**
 * Elevate
 */
export function elevateTransition(designSystem: DesignSystem): string {
    return `box-shadow ${toMs(duration(designSystem))} ${bezier(designSystem)}`;
}


// Config packs
export const revealInitial: CSSRules<DesignSystem> = {
    opacity: "0",
    "box-shadow": "none",
    transform: revealTransform(400), // How do we tie this to props?
};

export const revealProgress: CSSRules<DesignSystem> = {
    transition: revealTransition,
    transform: "translateX(0) scale(1)",
    opacity: "1",
}


export const dismissProgress: CSSRules<DesignSystem> = {
    transition: dismissTransition,
    opacity: "0",
    transform: dismissTransform(400),
}
