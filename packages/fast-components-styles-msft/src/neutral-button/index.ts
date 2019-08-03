import { ButtonBaseClassNameContract as NeutralButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { DesignSystem } from "../design-system";
import { baseButton, buttonStyles } from "../patterns/button";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";
import {
    neutralFillActive,
    neutralFillHover,
    neutralFillRest,
    neutralFocus,
    neutralForegroundRest,
} from "../utilities/color";

const styles: ComponentStyles<NeutralButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: neutralForegroundRest,
        fill: neutralForegroundRest,
        background: neutralFillRest,
        "&:hover:enabled": {
            background: neutralFillHover,
            "@media (-ms-high-contrast:active)": {
                background: "Highlight",
                color: "HighlightText",
            },
            "& $button_beforeContent, & $button_afterContent": {
                "@media (-ms-high-contrast:active)": {
                    fill: "HighlightText",
                },
            },
        },
        "&:active:enabled": {
            background: neutralFillActive,
        },
        ...applyFocusVisible<DesignSystem>({
            borderColor: neutralFocus,
        }),
        "&::-moz-focus-inner": {
            border: "0",
        },
        "& $button_beforeContent, & $button_afterContent": {
            "@media (-ms-high-contrast:active)": {
                fill: "ButtonText",
                "-ms-high-contrast-adjust": "none",
            },
        },
        "&$button__disabled": {
            "@media (-ms-high-contrast:active)": {
                opacity: "1",
                border: "1px solid graytext",
                backgroundColor: "transparent",
                color: "graytext",
            },
            "& $button_beforeContent, & $button_afterContent": {
                "@media (-ms-high-contrast:active)": {
                    fill: "graytext",
                },
            },
        },
        "@media (-ms-high-contrast:active)": {
            borderColor: "ButtonText",
            background: "Background",
            color: "ButtonText",
            fill: "ButtonHighlight",
            "-ms-high-contrast-adjust": "none",
            
        },
    },
};

export default styles;
