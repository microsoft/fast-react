import { useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";

export enum TransitionStates {
    initial,
    entering,
    entered,
    exiting,
}

const listener: Map<symbol, number | void> = new Map(); // This won't work for multiple items, need a way to have a listener context for each function
export function useTransition(value: boolean, duration: number | {in: number, out: number}): TransitionStates {
    // TODO what if duration changes across calls?
    const [visible, setVisible]: [boolean, (val: boolean) => void] = useState<boolean>(false);
    const [id, setId]: [symbol, (val: symbol) => void] = useState(Symbol())

    if (visible === true && value === true) {
        return TransitionStates.entered;
    } else if (visible === false && value === false) {
        return TransitionStates.initial;
    } else if (value && !visible) {
        if (typeof listener.get(id) !== "number") {
            listener.set(
                id,
                window.setTimeout(() => {
                    listener.set(id, window.clearTimeout(listener.get(id) as number))
                    setVisible(value);
                }, typeof duration === "number" ? duration : duration.in)
            )
        }

        return TransitionStates.entering;
    } else if (!value && visible) {
        if (typeof listener.get(id) !== "number") {
            listener.set(
                id,
                window.setTimeout(() => {
                    listener.set(id, window.clearTimeout(listener.get(id) as number))
                    setVisible(value);
                }, typeof duration === "number" ? duration : duration.out)
            )
        }

        return TransitionStates.exiting;
    } else {
        return TransitionStates.initial;
    }
}
