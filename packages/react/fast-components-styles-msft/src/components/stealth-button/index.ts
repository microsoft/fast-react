import { ButtonBaseClassNameContract as StealthButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import {
    neutralFillStealthActive,
    neutralFillStealthActiveCustomProperty,
    neutralFillStealthHover,
    neutralFillStealthHoverCustomProperty,
    neutralFillStealthRest,
    neutralFillStealthRestCustomProperty,
    neutralFocus,
    neutralFocusCustomProperty,
    neutralForegroundRest,
    neutralForegroundRestCustomProperty,
} from "../../utilities/color";
import { baseButton, buttonStyles } from "../../patterns/button";
import {
    highContrastDisabledBorder,
    highContrastLinkBorder,
    highContrastLinkOutline,
    highContrastOutlineFocus,
    highContrastSelected,
    highContrastStealth,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<StealthButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: neutralForegroundRestCustomProperty,
        fill: neutralForegroundRestCustomProperty,
        background: neutralFillStealthRestCustomProperty,
        "&:hover:enabled, a&:not($button__disabled):hover": {
            "background-color": neutralFillStealthHoverCustomProperty,
            ...highContrastSelected,
        },
        "&:active:enabled, a&:not($button__disabled):active": {
            "background-color": neutralFillStealthActiveCustomProperty,
        },
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocusCustomProperty,
            ...highContrastOutlineFocus,
        }),
        "&:disabled": {
            ...highContrastDisabledBorder,
        },
        ...highContrastStealth,
        "a&:not($button__disabled)": {
            ...highContrastLinkOutline,
            "&:not($button__disabled):hover": {
                ...highContrastLinkBorder,
            },
            "&$button__disabled": {
                ...highContrastDisabledBorder,
            },
        },
    },
};

export default styles;
export const stealthButtonDependencies = [
    [neutralFillStealthActiveCustomProperty, neutralFillStealthActive],
    [neutralFillStealthHoverCustomProperty, neutralFillStealthHover],
    [neutralFillStealthRestCustomProperty, neutralFillStealthRest],
    [neutralFocusCustomProperty, neutralFocus],
    [neutralForegroundRestCustomProperty, neutralForegroundRest],
];
