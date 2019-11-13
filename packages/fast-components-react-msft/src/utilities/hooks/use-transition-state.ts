import { useEffect, useState } from "react";
import { isNumber } from "lodash-es";
import { useTimeout } from "./use-timeout";

export enum TransitionStates {
    inactive, // The initial state of the component before an transition changes
    active, // The completed state after transition changes
    activating, // The middle state going from start -> end
    deactivating, // The middle state going from end -> start
}

export function useTransitionState(
    value: boolean,
    duration: number | { activating: number; deactivating: number }
): TransitionStates {
    const [valueState, setValueState]: [
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(value);
    const state: TransitionStates =
        value && valueState
            ? TransitionStates.active
            : !value && !valueState
                ? TransitionStates.inactive
                : value && !valueState
                    ? TransitionStates.activating
                    : TransitionStates.deactivating;

    const _duration: number = isNumber(duration)
        ? duration
        : state === TransitionStates.activating || TransitionStates.inactive
            ? duration.activating
            : duration.deactivating;

    useTimeout(() => {
        if (value !== valueState) {
            setValueState(value);
        }
    }, _duration);

    return state;
}
