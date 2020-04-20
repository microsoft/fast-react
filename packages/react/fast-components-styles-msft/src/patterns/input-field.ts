import { CSSRules } from "@microsoft/fast-jss-manager";
import { format, toPx } from "@microsoft/fast-jss-utilities";
import { applyCornerRadius } from "../utilities/border";
import { DesignSystem } from "../design-system";
import {
    neutralFillHoverCustomProperty,
    neutralFillHoverDefinition,
    neutralFillInputActiveCustomProperty,
    neutralFillInputActiveDefinition,
    neutralFillInputHoverCustomProperty,
    neutralFillInputHoverDefinition,
    neutralFillInputRestCustomProperty,
    neutralFillInputRestDefinition,
    neutralFillRestCustomProperty,
    neutralFillRestDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralForegroundHintCustomProperty,
    neutralForegroundHintDefinition,
    neutralForegroundRestCustomProperty,
    neutralForegroundRestDefinition,
    neutralOutlineActiveCustomProperty,
    neutralOutlineActiveDefinition,
    neutralOutlineHoverCustomProperty,
    neutralOutlineHoverDefinition,
    neutralOutlineRestCustomProperty,
    neutralOutlineRestDefinition,
} from "../utilities/color";
import { horizontalSpacing } from "../utilities/density";
import { applyDisabledState } from "../utilities/disabled";
import { applyScaledTypeRamp } from "../utilities/typography";
import { applyFontWeightNormal } from "../utilities/fonts";
import { outlineWidth } from "../utilities/design-system";
import {
    HighContrastColor,
    highContrastDisabledBorder,
    highContrastOptOutProperty,
    highContrastOutlineFocus,
    highContrastSelector,
} from "../utilities/high-contrast";

/**
 * Shared input field styles
 */
export function inputFieldStyles(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    config?: DesignSystem /* @deprecated - argument is no longer necessary */
): CSSRules<{}> {
    return {
        ...applyScaledTypeRamp("t7"),
        ...applyFontWeightNormal(),
        background: neutralFillInputRestCustomProperty,
        border: format(
            "{0} solid {1}",
            toPx<DesignSystem>(outlineWidth),
            neutralOutlineRestCustomProperty
        ),
        color: neutralForegroundRestCustomProperty,
        "font-family": "inherit",
        "box-sizing": "border-box",
        padding: format("0 {0}", horizontalSpacing(outlineWidth)),
        ...applyCornerRadius(),
        margin: "0",
        transition: "all 0.2s ease-in-out",
        "&:hover:enabled": {
            background: neutralFillInputHoverCustomProperty,
            "border-color": neutralOutlineHoverCustomProperty,
            [highContrastSelector]: {
                background: HighContrastColor.buttonBackground,
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    () => HighContrastColor.selectedBackground
                ),
            },
        },
        "&:active:enabled": {
            background: neutralFillInputActiveCustomProperty,
            "border-color": neutralOutlineActiveCustomProperty,
        },
        "&:focus:enabled": {
            "box-shadow": format<DesignSystem>(
                "0 0 0 1px {0} inset",
                neutralFocusCustomProperty
            ),
            "border-color": neutralFocusCustomProperty,
            outline: "none",
            ...highContrastOutlineFocus,
        },
        "&:disabled": {
            ...applyDisabledState(),
            ...highContrastDisabledBorder,
        },
        "&::placeholder": {
            color: neutralForegroundHintCustomProperty,
            [highContrastSelector]: {
                color: HighContrastColor.disabledText,
            },
        },
        [highContrastSelector]: {
            ...highContrastOptOutProperty,
            background: HighContrastColor.buttonBackground,
            "border-color": HighContrastColor.buttonText,
            color: HighContrastColor.buttonText,
        },
    };
}

export function filledInputFieldStyles(): CSSRules<{}> {
    return {
        ...inputFieldStyles(),
        background: neutralFillRestCustomProperty,
        border: format("{0} solid transparent", toPx(outlineWidth)),
        "&:hover:enabled": {
            background: neutralFillHoverCustomProperty,
            "border-color": "transparent",
            [highContrastSelector]: {
                background: HighContrastColor.buttonBackground,
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    () => HighContrastColor.selectedBackground
                ),
            },
        },
        "&:active:enabled": {
            "border-color": "transparent",
        },
        "&:focus:enabled": {
            "border-color": neutralFocusCustomProperty,
        },
        "&::placeholder": {
            color: neutralForegroundHintCustomProperty,
            [highContrastSelector]: {
                color: HighContrastColor.disabledText,
            },
        },
        [highContrastSelector]: {
            ...highContrastOptOutProperty,
            background: HighContrastColor.buttonBackground,
            "border-color": HighContrastColor.buttonText,
        },
    };
}
export const dependencies = [
    neutralFillHoverDefinition,
    neutralFillInputActiveDefinition,
    neutralFillInputHoverDefinition,
    neutralFillInputRestDefinition,
    neutralFillRestDefinition,
    neutralFocusDefinition,
    neutralForegroundHintDefinition,
    neutralForegroundRestDefinition,
    neutralOutlineActiveDefinition,
    neutralOutlineHoverDefinition,
    neutralOutlineRestDefinition,
];
