import CSS from "csstype";
import jss from "jss";
import { isNumber } from "lodash-es";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTimeout } from "./use-timeout";

// jss.setup();

// interface UseAnimationConfig {
//     duration: number | [number, number];
//     delay?: number | [number, number];
//     timingFunction: string | [string, string];
//     from: CSS.Properties;
//     to: CSS.Properties;
//     back?: CSS.Properties;
// }

// /**
//  * Formats useAnimation config args into keyframe objects. Will return one object when
//  * the animation is binary, and two when the forward animation is different than the reverse.
//  */
// function formatKeyframes(
//     config: UseAnimationConfig
// ): { 0: { [key: string]: CSS.Properties }; 1: { [key: string]: CSS.Properties } } {
//     return [
//         { from: config.from, to: config.to },
//         !!config.back
//             ? { from: config.to, to: config.back }
//             : { from: config.to, to: config.from },
//     ];
// }

// function normalizeConfigArg<T>(value: T | [T, T]): [T, T] {
//     return Array.isArray(value) ? value : [value, value];
// }
/**
 * Creates a set of CSS animation package selectors and returns
 * the appropriate class-name to apply based on animation state
 *
 * - How do we know when we should start without animation?
 * - How do we know when we should start with animation?
 * - What happens if this data needs to go in base components?
 */
// export function useTransition(config: UseAnimationConfig, value: boolean): string {
//     const keyframes: ReturnType<typeof formatKeyframes> = formatKeyframes(config);
//     const duration: [number, number] = normalizeConfigArg(config.duration);
//     const delay: ReturnType<typeof normalizeConfigArg> = normalizeConfigArg(
//         config.delay || 0
//     );
//     const timingFunction: [string, string] = normalizeConfigArg(config.timingFunction);
//     const transitionState: TransitionStates = useBinaryTransitionState(value, {
//         in: duration[0] + (delay[0] as number),
//         out: duration[1] + (delay[1] as number),
//     });
//     const mounted: React.MutableRefObject<boolean> = useRef(false);
//     const configHash: string = JSON.stringify(config);

//     const [state, setState]: [any, any] = useState(
//         (): any => {
//             const sheet: any = {
//                 "@keyframes from": keyframes[0],
//                 "@keyframes to": keyframes[1],
//                 to: {
//                     "animation-duration": duration[0] + "ms",
//                     "animation-delay": delay[0] + "ms",
//                     "animating-timing-function": timingFunction[0],
//                     "animation-fill-mode": "both",
//                     "animation-name": "to",
//                 },
//                 from: {
//                     "animation-duration": duration[1] + "ms",
//                     "animation-delay": delay[1] + "ms",
//                     "animating-timing-function": timingFunction[1],
//                     "animation-fill-mode": "both",
//                     "animation-name": "from",
//                 },
//             };

//             return jss.createStyleSheet(sheet);
//         }
//     );

//     useLayoutEffect(
//         (): void => {
//             if (mounted.current) {
//                 setState(() => {
//                     const sheet: any = {
//                         "@keyframes from": keyframes[0],
//                         "@keyframes to": keyframes[1],
//                         to: {
//                             "animation-duration": duration[0] + "ms",
//                             "animation-delay": delay[0] + "ms",
//                             "animating-timing-function": timingFunction[0],
//                             "animation-fill-mode": "both",
//                             "animation-name": "to",
//                         },
//                         from: {
//                             "animation-duration": duration[1] + "ms",
//                             "animation-delay": delay[1] + "ms",
//                             "animating-timing-function": timingFunction[1],
//                             "animation-fill-mode": "both",
//                             "animation-name": "from",
//                         },
//                     };

//                     return jss.createStyleSheet(sheet);
//                 });
//             }
//         },
//         [configHash]
//     );

//     // Attach the sheet if we're not attached yet
//     useLayoutEffect(
//         (): void => {
//             if (!state.attached) {
//                 state.attach();
//             }
//         },
//         [configHash]
//     );

//     useEffect(
//         () => (): void => {
//             jss.removeStyleSheet(state);
//         },
//         []
//     );

//     return state.classes[TransitionStates[transitionState]];
//     /**
//      * 1. Process incoming config to a JSS object
//      *      a. how do we prevent duplicate creation of CSS? JSON.stringify?
//      *      b. should this generate with the theme object?
//      * 2. Write that JSS object to a CSS object if this is our first run through
//      * 3. Get the transition state
//      *      a. if keyframes or no "back" property, use binary
//      *      b. otherwise use tertiary
//      */
//     // This isn't syncronous, so we don't have classes intially. How do we get the classes out of this when using layout effects?
// }

// export function useTransitionTwo(
//     value: boolean,
//     config: UseAnimationConfig,
//     animateInitial: boolean = false
// ): string {
//     return "foo";
// }
