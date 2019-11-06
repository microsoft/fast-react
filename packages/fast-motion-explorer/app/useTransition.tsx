import { useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";
import { isNumber } from "util";

export enum TransitionStates {
    from,
    to,
    out,
}

const listener: Map<symbol, number | void> = new Map(); // This won't work for multiple items, need a way to have a listener context for each function
export function useTransition(
    value: boolean,
    duration: number | { in: number; out: number }
): TransitionStates {
    // TODO what if duration changes across calls?
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
            : !visible && !value
                ? TransitionStates.from
                : TransitionStates.out;

    if (value !== visible && !isNumber(id)) {
        listener.set(
            id,
            window.setTimeout(() => {
                listener.set(id, window.clearTimeout(listener.get(id) as number));
                setVisible(value);
            }, isNumber(duration) ? duration : state === TransitionStates.to ? duration.in : duration.out)
        );
    }

    return state;
}
