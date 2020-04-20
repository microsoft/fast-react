import { ButtonBaseClassNameContract as AccentButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { applyFocusVisible, format } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import { baseButton, buttonStyles } from "../../patterns/button";
import {
    accentFillActiveCustomProperty,
    accentFillActiveDefinition,
    accentFillHoverCustomProperty,
    accentFillHoverDefinition,
    accentFillRestCustomProperty,
    accentFillRestDefinition,
    accentForegroundCutCustomProperty,
    accentForegroundCutDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralFocusInnerAccentCustomProperty,
    neutralFocusInnerAccentDefinition,
} from "../../utilities/color";
import {
    highContrastAccent,
    highContrastDisabledBorder,
    highContrastDisabledForeground,
    highContrastDoubleFocus,
    highContrastHighlightForeground,
    highContrastLinkBorder,
    highContrastLinkForeground,
    highContrastLinkOutline,
    highContrastSelectedForeground,
    highContrastSelectedOutline,
    highContrastSelector,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<AccentButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: accentForegroundCutCustomProperty,
        fill: accentForegroundCutCustomProperty,
        background: accentFillRestCustomProperty,
        "&:hover:enabled, a&:not($button__disabled):hover": {
            background: accentFillHoverCustomProperty,
            ...highContrastSelectedOutline,
            "& $button_beforeContent, & $button_afterContent": {
                ...highContrastHighlightForeground,
            },
        },
        "&:active:enabled, a&:not($button__disabled):active": {
            background: accentFillActiveCustomProperty,
        },
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocusCustomProperty,
            "box-shadow": format(
                "0 0 0 2px inset {0}",
                neutralFocusInnerAccentCustomProperty
            ),
            ...highContrastDoubleFocus,
        }),
        "&:disabled": {
            ...highContrastDisabledBorder,
            "& $button_beforeContent, & $button_afterContent": {
                ...highContrastDisabledForeground,
            },
        },
        "& $button_beforeContent, & $button_afterContent": {
            fill: accentForegroundCutCustomProperty,
            ...highContrastSelectedForeground,
        },
        ...highContrastAccent,
        "a&:not($button__disabled)": {
            ...highContrastLinkOutline,
            "& $button_beforeContent, & $button_afterContent": {
                ...highContrastLinkForeground,
            },
            "&:not($button__disabled):hover": {
                ...highContrastLinkBorder,
                "& $button_beforeContent, & $button_afterContent": {
                    ...highContrastLinkForeground,
                },
            },
            "&$button__disabled": {
                ...highContrastDisabledBorder,
                "& $button_beforeContent, & $button_afterContent": {
                    ...highContrastDisabledForeground,
                },
                "&:hover": {
                    [highContrastSelector]: {
                        "box-shadow": "none !important",
                    },
                    "& $button_beforeContent, & $button_afterContent": {
                        ...highContrastDisabledForeground,
                    },
                },
            },
        },
    },
};

export default styles;
export const accentButtonDependencies = [
    accentFillActiveDefinition,
    accentFillHoverDefinition,
    accentFillRestDefinition,
    accentForegroundCutDefinition,
    neutralFocusDefinition,
    neutralFocusInnerAccentDefinition,
];
