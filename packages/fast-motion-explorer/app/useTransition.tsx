import { useState } from "react";
import { EventListener } from "popmotion/lib/input/listen/types";

export enum TransitionStates {
    initial,
    entering,
    entered,
    exiting,
}

let listener: number | void; // This won't work for multiple items, need a way to have a listener context for each function
export function useTransition(value: boolean, duration: number | {in: number, out: number}): TransitionStates {
    // TODO what if duration changes across calls?
    const [visible, setVisible]: [boolean, (val: boolean) => void] = useState(false as boolean);

    if (visible === true && value === true) {
        return TransitionStates.entered;
    } else if (visible === false && value === false) {
        return TransitionStates.initial;
    } else if (value && !visible) {
        if (typeof listener !== "number") {
            listener = window.setTimeout(() => {
                listener = window.clearTimeout(listener as number);
                setVisible(value);
            }, typeof duration === "number" ? duration : duration.in);
        }

        return TransitionStates.entering;
    } else if (!value && visible) {
        if (typeof listener !== "number") {
            listener = window.setTimeout(() => {
                listener = window.clearTimeout(listener as number);
                setVisible(value);
            }, typeof duration === "number" ? duration : duration.out);
        }

        return TransitionStates.exiting;
    } else {
        return TransitionStates.initial;
    }
}
