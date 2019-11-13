import { useEffect, useRef } from "react";
import { isFunction } from "lodash-es";

/**
 * React hook to call set a timeout
 */
export function useTimeout(callback: () => void, delay: number | null): void {
    const savedCallback: React.MutableRefObject<(() => any)> = useRef(callback);

    useEffect(
        () => {
            savedCallback.current = callback;
        },
        [callback]
    );

    useEffect(
        () => {
            function tick(): void {
                savedCallback.current();
            }

            if (delay !== null) {
                const id: number = window.setTimeout(tick, delay);
                return (): void => window.clearTimeout(id);
            }
        },
        [delay]
    );
}
