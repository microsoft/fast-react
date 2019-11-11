import CSS from "csstype";
import { isNumber, isString } from "lodash-es";
import { useLayoutEffect, useRef } from "react";
import jss from "jss";

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
export function useAnimation(config: UseAnimationConfig, value: boolean): string {
    const className: React.RefObject<string | undefined> = useRef();
    const keyframes: ReturnType<typeof formatKeyframes> = formatKeyframes(config);
    const duration: [number, number] = normalizeConfigArg(config.duration);
    const delay: ReturnType<typeof normalizeConfigArg> = normalizeConfigArg(
        config.delay || 0
    );
    const timingFunction: [string, string] = normalizeConfigArg(config.timingFunction);

    useLayoutEffect((): void => {
        const sheet: any = {
            "@keyframes from": keyframes[0],
            "@keyframes to": keyframes[1],
            in: {
                "animation-duration": duration[0],
                "animation-delay": delay[0],
                "animating-timing-function": timingFunction[0],
                "animation-name": "to",
            },
            out: {
                "animation-duration": duration[1],
                "animation-delay": delay[1],
                "animating-timing-function": timingFunction[1],
                "animation-name": "from",
            },
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
    return "wo";
}

useAnimation({ duration: 20, timingFunction: "", from: {}, to: {}, back: {} }, true);
