import { useEffect, useRef, useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";
import { isNumber } from "util";
import { isFunction } from "@babel/types";

export enum TransitionStates {
    from,
    to,
    out,
}

/**
 * React hook to call setIterval
 */
export function useInterval(callback: () => any, delay: number | null): void {
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
                const id: number = window.setInterval(tick, delay);
                return (): void => window.clearInterval(id);
            }
        },
        [delay]
    );
}

/**
 * Hook to manage transition states based on timeouts
 */
export function useTransition(
    value: boolean,
    duration: number | { in: number; out: number }
): TransitionStates {
    const [visible, setVisible]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false);
    const [id, setId]: [symbol, React.Dispatch<React.SetStateAction<symbol>>] = useState(
        Symbol()
    );

    const state: TransitionStates =
        (visible && value) || (value && !visible)
            ? TransitionStates.to
            : visible && !value
                ? TransitionStates.from
                : TransitionStates.out;

    const dur: number = isNumber(duration)
        ? duration
        : state === TransitionStates.to
            ? duration.in
            : duration.out;
    useInterval(() => {
        if (value !== visible && !isNumber(id)) {
            setVisible(value);
        }
    }, dur);

    return state;
}
