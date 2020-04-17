import { ButtonBaseClassNameContract as NeutralButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import { baseButton, buttonStyles } from "../../patterns/button";
import {
    neutralFillActive,
    neutralFillActiveCustomProperty,
    neutralFillHover,
    neutralFillHoverCustomProperty,
    neutralFillRest,
    neutralFillRestCustomProperty,
    neutralFocus,
    neutralFocusCustomProperty,
    neutralForegroundRest,
    neutralForegroundRestCustomProperty,
} from "../../utilities/color";
import {
    highContrastDisabledBorder,
    highContrastLinkBorder,
    highContrastLinkOutline,
    highContrastOutline,
    highContrastOutlineFocus,
    highContrastSelected,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<NeutralButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: neutralForegroundRestCustomProperty,
        fill: neutralForegroundRestCustomProperty,
        background: neutralFillRestCustomProperty,
        "&:hover:enabled, a&:not($button__disabled):hover": {
            background: neutralFillHoverCustomProperty,
            ...highContrastSelected,
        },
        "&:active:enabled, a&:not($button__disabled):active": {
            background: neutralFillActiveCustomProperty,
        },
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocusCustomProperty,
            ...highContrastOutlineFocus,
        }),
        "&:disabled": {
            ...highContrastDisabledBorder,
        },
        "&::-moz-focus-inner": {
            border: "0",
        },
        ...highContrastOutline,
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
export const neutralButtonDependencies = [
    [neutralFillActiveCustomProperty, neutralFillActive],
    [neutralFillHoverCustomProperty, neutralFillHover],
    [neutralFillRestCustomProperty, neutralFillRest],
    [neutralFocusCustomProperty, neutralFocus],
    [neutralForegroundRestCustomProperty, neutralForegroundRest],
];
