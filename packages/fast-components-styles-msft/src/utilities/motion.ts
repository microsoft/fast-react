import { DesignSystem } from "../design-system";
import { relativeMotion } from "./design-system";

export function bezier(designSystem: DesignSystem): string {
    // TODO: should this be [number, number, number, number] and require formatting?
    const value: number = relativeMotion(designSystem);

    return `bezier(${(value / 2)}, ${(0.5 - value / 2)}, ${(
        value / 2 - 0.1
    )}, ${(1)})`;
}

export function duration(designSystem: DesignSystem): number {
    const max: number = 400;
    const min: number = 150;

    return relativeMotion(designSystem) * (max - min) + min;
}
