import { ButtonBaseClassNameContract as LightweightButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { applyFocusVisible, format, subtract, toPx } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import { baseButton, buttonStyles } from "../../patterns/button";
import {
    neutralFocusCustomProperty,
    neutralForegroundRestCustomProperty,
    neutralOutlineActiveCustomProperty,
    neutralOutlineHoverCustomProperty,
    neutralOutlineRestCustomProperty,
} from "../../utilities/color";
import { horizontalSpacing } from "../../utilities/density";
import { focusOutlineWidth, outlineWidth } from "../../utilities/design-system";
import {
    highContrastDisabledBorder,
    highContrastLinkBorder,
    highContrastLinkOutline,
    highContrastOutline,
    highContrastOutlineFocus,
    highContrastSelected,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<LightweightButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: neutralForegroundRestCustomProperty,
        fill: neutralForegroundRestCustomProperty,
        background: "transparent",
        border: format(
            "{0} solid {1}",
            toPx<DesignSystem>(outlineWidth),
            neutralOutlineRestCustomProperty
        ),
        padding: format("0 {0}", horizontalSpacing(outlineWidth)),
        "&:hover:enabled, a&:not($button__disabled):hover": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralOutlineHoverCustomProperty
            ),
            ...highContrastSelected,
        },
        "&:active:enabled, a&:not($button__disabled):active": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralOutlineActiveCustomProperty
            ),
        },
        ...applyFocusVisible<DesignSystem>({
            "box-shadow": format(
                "0 0 0 {0} {1} inset",
                toPx<DesignSystem>(subtract(focusOutlineWidth, outlineWidth)),
                neutralFocusCustomProperty
            ),
            "border-color": neutralFocusCustomProperty,
            ...highContrastOutlineFocus,
        }),
        "&:disabled": {
            ...highContrastDisabledBorder,
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
