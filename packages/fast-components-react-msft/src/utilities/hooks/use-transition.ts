import { isUndefined } from "util";

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

export function normalizeAnimationConfigValue<T>(value: T | [T, T]): [T, T] {
    return Array.isArray(value) ? value : [value, value];
}

/**
 * Formats useAnimation config args into keyframe objects. Will return one object when
 * the animation is binary, and two when the forward animation is different than the reverse.
 */
export function formatKeyframes(
    inactive: React.CSSProperties,
    active: React.CSSProperties,
    deactivating?: React.CSSProperties
): {
    0: { from: React.CSSProperties; to: React.CSSProperties };
    1: { from: React.CSSProperties; to: React.CSSProperties };
} {
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
): void {
    const {
        duration,
        delay,
        timingFunction,
        inactive,
        active,
        deactivating,
    }: UseTransitionConfig = config;
    const durations: [number, number] = normalizeAnimationConfigValue(duration);
    const delays: [number, number] = normalizeAnimationConfigValue(
        isUndefined(duration) ? 0 : delay
    );
    const timingFunctions: [string, string] = normalizeAnimationConfigValue(
        config.timingFunction
    );
}
