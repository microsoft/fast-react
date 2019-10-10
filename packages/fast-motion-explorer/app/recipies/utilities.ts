import {
    DesignSystem,
    DesignSystemResolver,
} from "@microsoft/fast-components-styles-msft";
import { toMs } from "@microsoft/fast-jss-utilities";
import { StandardLonghandPropertiesHyphen } from "csstype";

/**
 * Format a transition property
 * TODO what about delay?
 * TODO Can I customize bezier/timing for each property?
 */
export function formatTransition(
    duration: DesignSystemResolver<number>
): (
    bezier: DesignSystemResolver<string>
) => (...properties: Array<keyof StandardLonghandPropertiesHyphen>) => DesignSystemResolver<string> {
    return (
        bezier: DesignSystemResolver<string>
    ): ((...properties: Array<keyof StandardLonghandPropertiesHyphen>) => DesignSystemResolver<string>) => {
        return (...properties: Array<keyof StandardLonghandPropertiesHyphen>): DesignSystemResolver<string> => {
            return (designSystem: DesignSystem): string => {
                return properties
                    .map(
                        (property: keyof StandardLonghandPropertiesHyphen) =>
                            `${property} ${toMs(duration(designSystem))} ${bezier(
                                designSystem
                            )}`
                    )
                    .join(",");
            };
        };
    };
}
