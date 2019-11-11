import CSS from "csstype";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";
import { isFunction, isNumber } from "lodash-es";
import { useTimeout } from "./use-timeout";
import jss from "jss";

jss.setup();

export enum TransitionStates {
    from,
    to,
    out,
}

/**
 * Factory function for useTransition hooks
 */
function useTransitionStateFactory(
    stateResovler: (previous: boolean, next: boolean) => TransitionStates
): (
    nextVisible: boolean,
    duration: number | { in: number; out: number }
) => TransitionStates {
    return (
        nextVisible: boolean,
        duration: number | { in: number; out: number }
    ): TransitionStates => {
        const [visible, setVisible]: [
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ] = useState<boolean>(false);
        const state: TransitionStates = stateResovler(visible, nextVisible);

        const _duration: number = isNumber(duration)
            ? duration
            : state === TransitionStates.to
            ? duration.in
            : duration.out;

        useTimeout(() => {
            if (nextVisible !== visible) {
                setVisible(nextVisible);
            }
        }, _duration);

        return state;
    };
}
/**
 * Hook to manage transition states based on timeouts.
 * This is a three-state hook which transitions between "from", "to", and "back"
 * This hook is used when the reverse transition is different than the
 * forward transition
 */
export const useTransitionState: ReturnType<
    typeof useTransitionStateFactory
> = useTransitionStateFactory(
    (previous: boolean, next: boolean): TransitionStates => {
        return (previous && next) || (next && !previous)
            ? TransitionStates.to
            : previous && !next
            ? TransitionStates.out
            : TransitionStates.from;
    }
);

/**
 * Hook to manage transtions states based on timeouts.
 * Similar to useTransitionState, however this impelments a simple binary switch
 * instead of a tri-state model. Use this when the reverse transition is a simple
 * reverse of the forward transition
 */
export const useBinaryTransitionState: ReturnType<
    typeof useTransitionStateFactory
> = useTransitionStateFactory(
    (previous: boolean, next: boolean): TransitionStates => {
        return (previous && next) || (!previous && next)
            ? TransitionStates.to
            : TransitionStates.from;
    }
);

interface UseAnimationConfig {
    duration: number | [number, number];
    delay?: number | [number, number];
    timingFunction: string | [string, string];
    from: CSS.Properties;
    to: CSS.Properties;
    back?: CSS.Properties;
}

/**
 * Formats useAnimation config args into keyframe objects. Will return one object when
 * the animation is binary, and two when the forward animation is different than the reverse.
 */
function formatKeyframes(
    config: UseAnimationConfig
): { 0: { [key: string]: CSS.Properties }; 1: { [key: string]: CSS.Properties } } {
    return [
        { from: config.from, to: config.to },
        !!config.back
            ? { from: config.to, to: config.back }
            : { from: config.to, to: config.from },
    ];
}

function normalizeConfigArg<T>(value: T | [T, T]): [T, T] {
    return Array.isArray(value) ? value : [value, value];
}
/**
 * Creates a set of CSS animation package selectors and returns
 * the appropriate class-name to apply based on animation state
 */
export function useTransition(config: UseAnimationConfig, value: boolean): string {
    const classNames: React.MutableRefObject<
        { in: string; out: string } | undefined
    > = useRef();
    const keyframes: ReturnType<typeof formatKeyframes> = formatKeyframes(config);
    const duration: [number, number] = normalizeConfigArg(config.duration);
    const delay: ReturnType<typeof normalizeConfigArg> = normalizeConfigArg(
        config.delay || 0
    );
    const timingFunction: [string, string] = normalizeConfigArg(config.timingFunction);
    const transitionState: TransitionStates = useBinaryTransitionState(value, {
        in: duration[0] + (delay[0] as number),
        out: duration[1] + (delay[1] as number),
    });

    useLayoutEffect((): (() => void) => {
        const sheet: any = {
            "@keyframes from": keyframes[0],
            "@keyframes to": keyframes[1],
            in: {
                "animation-duration": duration[0] + "ms",
                "animation-delay": delay[0] + "ms",
                "animating-timing-function": timingFunction[0],
                "animation-fill-mode": "both",
                "animation-name": "to",
            },
            out: {
                "animation-duration": duration[1] + "ms",
                "animation-delay": delay[1] + "ms",
                "animating-timing-function": timingFunction[1],
                "animation-fill-mode": "both",
                "animation-name": "from",
            },
        };

        const jssStyleSheet: any = jss.createStyleSheet(sheet).attach();
        classNames.current = jssStyleSheet.classes;

        return (): void => {
            jss.removeStyleSheet(jssStyleSheet);
        };
    }, [
        duration[0],
        duration[1],
        delay[0],
        delay[1],
        timingFunction[0],
        timingFunction[1],
        JSON.stringify(keyframes[0]),
        JSON.stringify(keyframes[1]),
    ]);

    /**
     * 1. Process incoming config to a JSS object
     *      a. how do we prevent duplicate creation of CSS? JSON.stringify?
     *      b. should this generate with the theme object?
     * 2. Write that JSS object to a CSS object if this is our first run through
     * 3. Get the transition state
     *      a. if keyframes or no "back" property, use binary
     *      b. otherwise use tertiary
     */
    if (!classNames.current) {
        return "";
    }
    return transitionState === TransitionStates.to
        ? (classNames.current as any).in
        : (classNames.current as any).out;
    // This isn't syncronous, so we don't have classes intially. How do we get the classes out of this when using layout effects?
}
