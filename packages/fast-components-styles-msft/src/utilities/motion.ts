import { DesignSystem, DesignSystemResolver } from "../design-system";
import { relativeMotion } from "./design-system";
import { isFunction, isNumber } from "lodash-es";
import { add, multiply } from "@microsoft/fast-jss-utilities";

export function bezier(designSystem: DesignSystem): string {
    // TODO: should this be [number, number, number, number] and require formatting?
    const value: number = relativeMotion(designSystem);
    const coordinates: number[] = [value / 2, 0.5 - value / 2, value / 2 - 0.1, 1].map(
        (val: number) => Math.min(Math.max(0, val), 1)
    );

    return `cubic-bezier(${coordinates.join(",")})`;
}

/**
 * Scale duration up by a somewhat arbitrary value
 */
export const relativeDuration: ReturnType<typeof multiply> = multiply(
    relativeMotion,
    500
);

/**
 * Returns the duration of motion as a number of milliseconds
 */
export function duration(delta: number | DesignSystemResolver<number>): DesignSystemResolver<number>;
export function duration(designSystem: DesignSystem): number;
export function duration(val: any): any {
    if (isNumber(val)) {
        return (designSystem: DesignSystem): number => {
            const dur: number = relativeDuration(designSystem);
            return dur === 0 ? dur : dur + val;
        };
    } else if (isFunction(val)) {
        return (designSystem: DesignSystem): number => {
            return duration(val(designSystem))(designSystem);
        }
        // handle fn input
    } else {
        return relativeDuration(val);
    }
}
