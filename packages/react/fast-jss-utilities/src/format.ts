import { isString } from "lodash-es";

export function format<T>(
    value: string,
    ...args: Array<((designSystem: T) => string) | string>
): (designSystem: T) => string {
    return (designSystem: T): string => {
        return args.reduce(
            (
                reducedValue: string,
                currentValue: ((designSystem: T) => string) | string,
                index: number
            ): string => {
                return reducedValue.replace(
                    new RegExp(`\\{${index}\\}`, "g"),
                    typeof currentValue === "string"
                        ? currentValue
                        : currentValue(designSystem)
                );
            },
            value
        ) as string;
    };
}

export function toString<T, S>(
    resolver: (designSystem?: T) => any
): (designSystem?: T) => string {
    return (designSystem: T): string => String(resolver(designSystem));
}

export function important<T>(value: string): string;
export function important<T>(value: (arg: T) => string): (arg: T) => string;
export function important<T>(value: any): any {
    return isString(value)
        ? `${value} !important`
        : (arg: T): string => important(value(arg));
}
