import { useEffect, useRef } from "react";
import { isFunction } from "lodash-es";
/**
 * React hook to call set a timeout
 */
export function useTimeout(
    callback: () => any,
    delay: number | null,
    memo?: any[]
): void {
    const savedCallback: React.MutableRefObject<(() => any) | undefined> = useRef();

    useEffect(
        () => {
            savedCallback.current = callback;
        },
        [callback, Array.isArray(memo) ? memo : ""]
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
        [delay, Array.isArray(memo) ? memo : ""]
    );
}
