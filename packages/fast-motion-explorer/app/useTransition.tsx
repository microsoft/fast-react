import { useEffect, useRef, useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";
import { isFunction, isNumber } from "lodash-es";

export enum TransitionStates {
    from,
    to,
    out,
}

/**
 * React hook to call setIterval
 */
export function useTimeout(callback: () => any, delay: number | null): void {
    const savedCallback: React.MutableRefObject<(() => any) | undefined> = useRef();

    useEffect(
        () => {
            savedCallback.current = callback;
        },
        [callback]
    );

    useEffect(
        () => {
            function tick(): void {
                if (isFunction(savedCallback.current)) {
                    savedCallback.current();
                }
            }

            if (delay !== null) {
                const id: number = window.setTimeout(tick, delay);
                return (): void => window.clearTimeout(id);
            }
        },
        [delay]
    );
}

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

// export function useTransitionState(
//     value: boolean,
//     duration: number | { in: number; out: number }
// ): TransitionStates {
//     const [visible, setVisible]: [
//         boolean,
//         React.Dispatch<React.SetStateAction<boolean>>
//     ] = useState<boolean>(false);
//     const [id, setId]: [symbol, React.Dispatch<React.SetStateAction<symbol>>] = useState(
//         Symbol()
//     );
//
//     const state: TransitionStates =
//         (visible && value) || (value && !visible)
//             ? TransitionStates.to
//             : visible && !value
//             ? TransitionStates.from
//             : TransitionStates.out;
//
//     const dur: number = isNumber(duration)
//         ? duration
//         : state === TransitionStates.to
//         ? duration.in
//         : duration.out;
//     useInterval(() => {
//         if (value !== visible && !isNumber(id)) {
//             setVisible(value);
//         }
//     }, dur);
//
//     return state;
// }
