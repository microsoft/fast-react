import {
    bezier,
    DesignSystem,
    DesignSystemResolver,
    duration,
} from "@microsoft/fast-components-styles-msft";
import { formatTransition } from "./utilities";

export function expandDuration(designSystem: DesignSystem): number {
    return duration(150)(designSystem);
}

/**
 * The expand transition value
 */
export const expandTransition: (
    ...properties: string[]
) => DesignSystemResolver<string> = formatTransition(expandDuration)(bezier);
