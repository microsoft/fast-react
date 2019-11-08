import { useEffect, useRef, useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";
import { isFunction, isNumber } from "lodash-es";
import { useTimeout } from "./use-timeout";

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
