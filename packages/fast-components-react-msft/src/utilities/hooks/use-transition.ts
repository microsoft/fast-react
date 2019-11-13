interface UseAnimationConfig {
    duration: number | [number, number];
    delay?: number | [number, number];
    timingFunction: string | [string, string];
    inactive: React.CSSProperties;
    activating: React.CSSProperties;
    deactivating?: React.CSSProperties;
}

export function useTransition() {}
