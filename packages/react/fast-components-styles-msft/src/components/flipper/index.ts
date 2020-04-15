import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { FlipperClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    applyFocusVisible,
    directionSwitch,
    format,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import {
    neutralFillStealthActiveCustomProperty,
    neutralFillStealthHoverCustomProperty,
    neutralFillStealthRestCustomProperty,
    neutralFocusCustomProperty,
    neutralForegroundRestCustomProperty,
    neutralOutlineActiveCustomProperty,
    neutralOutlineHoverCustomProperty,
    neutralOutlineRestCustomProperty,
} from "../../utilities/color";
import { glyphSize, height } from "../../utilities/density";
import { outlineWidth } from "../../utilities/design-system";
import { applyCursorPointer } from "../../utilities/cursor";
import {
    highContrastColorBackground,
    highContrastHighlightBackground,
    highContrastOutline,
    highContrastSelectedForeground,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<FlipperClassNameContract, DesignSystem> = {
    flipper: {
        ...applyCursorPointer(),
        width: height(),
        height: height(),
        display: "inline-flex",
        "justify-content": "center",
        "align-items": "center",
        margin: "0",
        position: "relative",
        fill: neutralForegroundRestCustomProperty,
        color: neutralForegroundRestCustomProperty,
        background: "transparent",
        border: "none",
        padding: "0",
        "&::before": {
            transition: "all 0.1s ease-in-out",
            content: "''",
            opacity: "0.8",
            background: neutralFillStealthRestCustomProperty,
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralOutlineRestCustomProperty
            ),
            "border-radius": "50%",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            ...highContrastColorBackground,
        },
        "&:active": {
            "&::before": {
                background: neutralFillStealthActiveCustomProperty,
                "border-color": neutralOutlineActiveCustomProperty,
            },
        },
        "&:hover": {
            "&::before": {
                background: neutralFillStealthHoverCustomProperty,
                "border-color": neutralOutlineHoverCustomProperty,
                ...highContrastHighlightBackground,
            },
            "& $flipper_glyph": {
                ...highContrastSelectedForeground,
            },
        },
        ...applyFocusVisible({
            "&::before": {
                "box-shadow": format<DesignSystem>(
                    "0 0 0 1px {0} inset",
                    neutralFocusCustomProperty
                ),
                border: neutralFocusCustomProperty,
            },
        }),
        "&::-moz-focus-inner": {
            border: "0",
        },
        ...highContrastOutline,
    },
    flipper_glyph: {
        position: "relative",
        transform: directionSwitch("none", "rotate(180deg)"),
        width: glyphSize,
        height: glyphSize,
    },
    flipper__next: {},
    flipper__previous: {},
};

export default styles;
