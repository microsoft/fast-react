import { useEffect, useRef } from "react";
import { isFunction } from "lodash-es";
/**
 * React hook to call set a timeout
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
