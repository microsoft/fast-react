import { isUndefined, uniqueId } from "lodash-es";
import { toMs } from "@microsoft/fast-jss-utilities";
import { useContext, useLayoutEffect, useState } from "react";
import jss from "jss";
import { TransitionStates, useTransitionState } from "./use-transition-state";
import { designSystemContext } from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";

jss.setup();

/**
 * Configuration object provided to the use-transition
 * utility. Describes the transition and CSS properties
 * to transition between
 */
export interface UseTransitionConfig {
    /**
     * The duration of the transition. When value is an array, the first index
     * describes the 'activating' duration and the second describes the
     * 'deactiving' duration
     */
    duration: number | [number, number];

    /**
     * The delay of the transition. When value is an array, the first index
     * describes the 'activating' delay and the second describes the
     * 'deactiving' delay
     */
    delay?: number | [number, number];

    /**
     * The timing function of the transition. When value is an array, the first index
     * describes the 'activating' timing function and the second describes the
     * 'deactiving' timing function
     */
    timingFunction: string | [string, string];

    /**
     * The CSS properties to apply in the 'inactive' state
     */
    inactive: React.CSSProperties;

    /**
     * The CSS properties to apply in the 'active' state
     */
    active: React.CSSProperties;

    /**
     * The CSS properties to apply to reach the 'inactive'
     * state from the 'active' state. If this property is not
     * supplied, it will default to the 'inactive' properties.
     * Use this when the transition *to* the active state is
     * different then the transition *from* the active state
     */
    deactivating?: React.CSSProperties;
}

/**
 * normalize config arguments for transition metadata
 * @private
 */
export function normalizeAnimationConfigValue<T>(value: T | [T, T]): [T, T] {
    return Array.isArray(value) ? value : [value, value];
}

/**
 * Create the transition JSS sheet object
 * @private
 */
export function createStyleSheetObject(
    keyframes: KeyFrames,
    duration: [number, number],
    delay: [number, number],
    timingFunction: [string, string]
): any {
    const id: string = uniqueId();
    const deactivatingName: string = `deactivating-${id}`;
    const activatingName: string = `activating-${id}`;

    return {
        [`@keyframes ${deactivatingName}`]: keyframes[1],
        [`@keyframes ${activatingName}`]: keyframes[0],
        common: {
            "animation-fill-mode": "forwards",
        },
        inactive: {
            ...keyframes[0].from,
        },
        active: {
            ...keyframes[0].to,
        },
        activating: {
            "animation-duration": toMs(duration[0]),
            "animation-delay": toMs(delay[0]),
            "animation-timing-function": timingFunction[0],
            "animation-name": activatingName,
        },
        deactivating: {
            "animation-duration": toMs(duration[1]),
            "animation-delay": toMs(delay[1]),
            "animation-timing-function": timingFunction[1],
            "animation-name": deactivatingName,
        },
    };
}

export type KeyFrames = [
    { from: React.CSSProperties; to: React.CSSProperties },
    { from: React.CSSProperties; to: React.CSSProperties }
];

/**
 * Formats useAnimation config args into keyframe objects. Will return one object when
 * the animation is binary, and two when the forward animation is different than the reverse.
 * @private
 */
export function formatKeyframes(
    inactive: React.CSSProperties,
    active: React.CSSProperties,
    deactivating?: React.CSSProperties
): KeyFrames {
    return [
        { from: inactive, to: active },
        !!deactivating
            ? { from: active, to: deactivating }
            : { from: active, to: inactive },
    ];
}

/**
 * Returns class-names to apply to the transitioning component.
 * Classes will apply CSS properties and animation based on the 'active' argument,
 * transitioning from
 */
export function useTransition(
    activeState: boolean,
    config: UseTransitionConfig,
    transitionIn: boolean = false
): string {
    const {
        duration,
        delay,
        timingFunction,
        inactive,
        active,
        deactivating,
    }: UseTransitionConfig = config;
    const context: unknown = useContext(designSystemContext);
    const durations: [number, number] = normalizeAnimationConfigValue(duration);
    const delays: [number, number] = normalizeAnimationConfigValue(
        isUndefined(delay) ? 0 : delay
    );
    const timingFunctions: [string, string] = normalizeAnimationConfigValue(
        config.timingFunction
    );
    const keyframes: ReturnType<typeof formatKeyframes> = formatKeyframes(
        inactive,
        active,
        deactivating
    );
    const [sheet, createStyleSheet]: any = useState((): any => {
        return jss
            .createStyleSheet(
                createStyleSheetObject(keyframes, durations, delays, timingFunctions)
            )
            .update(context);
    });
    const transitionState: TransitionStates = useTransitionState(
        activeState,
        activeState ? durations[1] : durations[0]
    );

    useLayoutEffect((): void => {
        if (!sheet.attached) {
            sheet.attach();
        }
    }, [sheet]);

    return classNames(
        sheet.classes.common,
        sheet.classes[TransitionStates[transitionState]]
    );
}
