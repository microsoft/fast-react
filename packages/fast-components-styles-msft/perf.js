import { create } from "jss";
import preset from "jss-preset-default";
import jssNested from "jss-nested";

import {
    AccentButtonStyles,
    ActionToggleStyles,
    ActionTriggerStyles,
    AutoSuggestStyles,
    AutoSuggestOptionStyles,
    BadgeStyles,
    BreadcrumbStyles,
    ButtonStyles,
    CallToActionStyles,
    CaptionStyles,
    CarouselStyles,
    CardStyles,
    CheckboxStyles,
    ContextMenuStyles,
    HeadingStyles,
    HypertextStyles,
    ContextMenuItemStyles,
    DialogStyles,
    DividerStyles,
    FlipperStyles,
    FlyoutStyles,
    ImageStyles,
    LabelStyles,
    LightweightButtonStyles,
    MetatextStyles,
    NeutralButtonStyles,
    NumberFieldStyles,
    OutlineButtonStyles,
    ParagraphStyles,
    PivotStyles,
    ProgressStyles,
    RadioStyles,
    SelectStyles,
    SelectOptionStyles,
    SliderStyles,
    SliderLabelStyles,
    StealthButtonStyles,
    SubheadingStyles,
    ToggleStyles,
    TextActionStyles,
    TextAreaStyles,
    TextFieldStyles,
    TypographyStyles
} from "./src";
import DesignSystem from "./src/design-system";
import {
    neutralForegroundRest,
    neutralForegroundHover,
    neutralForegroundActive,
    accentForegroundCut,
    accentForegroundCutLarge,
    neutralForegroundHint,
    neutralForegroundHintLarge,
    accentForegroundRest,
    accentForegroundHover,
    accentForegroundActive,
    accentForegroundLarge,
    accentForegroundLargeRest,
    accentForegroundLargeHover,
    accentForegroundLargeActive,
    neutralFillRest,
    neutralFillHover,
    neutralFillActive,
    neutralFillSelected,
    neutralFillStealthRest,
    neutralFillStealthHover,
    neutralFillStealthActive,
    neutralFillStealthSelected,
    neutralFillInputRest,
    neutralFillInputHover,
    neutralFillInputActive,
    neutralFillInputSelected,
    accentFillRest,
    accentFillHover,
    accentFillActive,
    accentFillSelected,
    accentFillLargeRest,
    accentFillLargeHover,
    accentFillLargeActive,
    accentFillLargeSelected,
    neutralFillCard,
    neutralOutlineRest,
    neutralOutlineHover,
    neutralOutlineActive,
    neutralLayerFloating,
    neutralLayerCard,
    neutralLayerCardContainer,
    neutralLayerL1,
    neutralLayerL1Alt,
    neutralLayerL2,
    neutralLayerL3,
    neutralLayerL4,
    neutralFocus,
    neutralFocusInnerAccent
} from "./src/utilities/color";
const Benchmark = require("benchmark");
import fs from "fs";

// Stylesheet dependencies
import { applyScaledTypeRamp } from "./src/utilities/typography";
import { applyCursorPointer } from "./src/utilities/cursor";
import { applyCornerRadius, applyFocusPlaceholderBorder } from "./src/utilities/border";
import { focusOutlineWidth, outlineWidth } from "./src/utilities/design-system";
import { applyDisabledState } from "./src/utilities/disabled";
import { glyphSize, height, horizontalSpacing } from "./src/utilities/density";
import { getDesignSystemValue } from "./src/design-system"
import {
    applyFocusVisible,
    directionSwitch,
    format,
    toPx,
} from "@microsoft/fast-jss-utilities";

var suite = new Benchmark.Suite();
const jssWithPlugins = create(preset());
const jssWithoutPlugins = create();
jssWithoutPlugins.use(jssNested())

const colorRecipes = [
    [neutralForegroundRest, "neutralForegroundRest"],
    [neutralForegroundHover, "neutralForegroundHover"],
    [neutralForegroundActive, "neutralForegroundActive"],
    [accentForegroundCut, "accentForegroundCut"],
    [accentForegroundCutLarge, "accentForegroundCutLarge"],
    [neutralForegroundHint, "neutralForegroundHint"],
    [neutralForegroundHintLarge, "neutralForegroundHintLarge"],
    [accentForegroundRest, "accentForegroundRest"],
    [accentForegroundHover, "accentForegroundHover"],
    [accentForegroundActive, "accentForegroundActive"],
    [accentForegroundLarge, "accentForegroundLarge"],
    [accentForegroundLargeRest, "accentForegroundLargeRest"],
    [accentForegroundLargeHover, "accentForegroundLargeHover"],
    [accentForegroundLargeActive, "accentForegroundLargeActive"],
    [neutralFillRest, "neutralFillRest"],
    [neutralFillHover, "neutralFillHover"],
    [neutralFillActive, "neutralFillActive"],
    [neutralFillSelected, "neutralFillSelected"],
    [neutralFillStealthRest, "neutralFillStealthRest"],
    [neutralFillStealthHover, "neutralFillStealthHover"],
    [neutralFillStealthActive, "neutralFillStealthActive"],
    [neutralFillStealthSelected, "neutralFillStealthSelected"],
    [neutralFillInputRest, "neutralFillInputRest"],
    [neutralFillInputHover, "neutralFillInputHover"],
    [neutralFillInputActive, "neutralFillInputActive"],
    [neutralFillInputSelected, "neutralFillInputSelected"],
    [accentFillRest, "accentFillRest"],
    [accentFillHover, "accentFillHover"],
    [accentFillActive, "accentFillActive"],
    [accentFillSelected, "accentFillSelected"],
    [accentFillLargeRest, "accentFillLargeRest"],
    [accentFillLargeHover, "accentFillLargeHover"],
    [accentFillLargeActive, "accentFillLargeActive"],
    [accentFillLargeSelected, "accentFillLargeSelected"],
    [neutralFillCard, "neutralFillCard"],
    [neutralOutlineRest, "neutralOutlineRest"],
    [neutralOutlineHover, "neutralOutlineHover"],
    [neutralOutlineActive, "neutralOutlineActive"],
    [neutralLayerFloating, "neutralLayerFloating"],
    [neutralLayerCard, "neutralLayerCard"],
    [neutralLayerCardContainer, "neutralLayerCardContainer"],
    [neutralLayerL1, "neutralLayerL1"],
    [neutralLayerL1Alt, "neutralLayerL1Alt"],
    [neutralLayerL2, "neutralLayerL2"],
    [neutralLayerL3, "neutralLayerL3"],
    [neutralLayerL4, "neutralLayerL4"],
];

const stylesheetRenderers = [
    [() => {jssWithPlugins.createStyleSheet(AccentButtonStyles).update(DesignSystem)}, "AccentButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(ActionToggleStyles).update(DesignSystem)}, "ActionToggleStyles"],
    [() => {jssWithPlugins.createStyleSheet(ActionTriggerStyles).update(DesignSystem)}, "ActionTriggerStyles"],
    [() => {jssWithPlugins.createStyleSheet(AutoSuggestStyles).update(DesignSystem)}, "AutoSuggestStyles"],
    [() => {jssWithPlugins.createStyleSheet(AutoSuggestOptionStyles).update(DesignSystem)}, "AutoSuggestOptionStyles"],
    [() => {jssWithPlugins.createStyleSheet(BadgeStyles).update(DesignSystem)}, "BadgeStyles"],
    [() => {jssWithPlugins.createStyleSheet(BreadcrumbStyles).update(DesignSystem)}, "BreadcrumbStyles"],
    [() => {jssWithPlugins.createStyleSheet(ButtonStyles).update(DesignSystem)}, "ButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(CallToActionStyles).update(DesignSystem)}, "CallToActionStyles"],
    [() => {jssWithPlugins.createStyleSheet(CaptionStyles).update(DesignSystem)}, "CaptionStyles"],
    [() => {jssWithPlugins.createStyleSheet(CarouselStyles).update(DesignSystem)}, "CarouselStyles"],
    [() => {jssWithPlugins.createStyleSheet(CardStyles).update(DesignSystem)}, "CardStyles"],
    [() => {jssWithPlugins.createStyleSheet(CheckboxStyles).update(DesignSystem)}, "CheckboxStyles"],
    [() => {jssWithPlugins.createStyleSheet(ContextMenuStyles).update(DesignSystem)}, "ContextMenuStyles"],
    [() => {jssWithPlugins.createStyleSheet(HeadingStyles).update(DesignSystem)}, "HeadingStyles"],
    [() => {jssWithPlugins.createStyleSheet(HypertextStyles).update(DesignSystem)}, "HypertextStyles"],
    [() => {jssWithPlugins.createStyleSheet(ContextMenuItemStyles).update(DesignSystem)}, "ContextMenuItemStyles"],
    [() => {jssWithPlugins.createStyleSheet(DialogStyles).update(DesignSystem)}, "DialogStyles"],
    [() => {jssWithPlugins.createStyleSheet(DividerStyles).update(DesignSystem)}, "DividerStyles"],
    [() => {jssWithPlugins.createStyleSheet(FlipperStyles).update(DesignSystem)}, "FlipperStyles"],
    [() => {jssWithPlugins.createStyleSheet(FlyoutStyles).update(DesignSystem)}, "FlyoutStyles"],
    [() => {jssWithPlugins.createStyleSheet(ImageStyles).update(DesignSystem)}, "ImageStyles"],
    [() => {jssWithPlugins.createStyleSheet(LabelStyles).update(DesignSystem)}, "LabelStyles"],
    [() => {jssWithPlugins.createStyleSheet(LightweightButtonStyles).update(DesignSystem)}, "LightweightButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(MetatextStyles).update(DesignSystem)}, "MetatextStyles"],
    [() => {jssWithPlugins.createStyleSheet(NeutralButtonStyles).update(DesignSystem)}, "NeutralButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(NumberFieldStyles).update(DesignSystem)}, "NumberFieldStyles"],
    [() => {jssWithPlugins.createStyleSheet(OutlineButtonStyles).update(DesignSystem)}, "OutlineButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(ParagraphStyles).update(DesignSystem)}, "ParagraphStyles"],
    [() => {jssWithPlugins.createStyleSheet(PivotStyles).update(DesignSystem)}, "PivotStyles"],
    [() => {jssWithPlugins.createStyleSheet(ProgressStyles).update(DesignSystem)}, "ProgressStyles"],
    [() => {jssWithPlugins.createStyleSheet(RadioStyles).update(DesignSystem)}, "RadioStyles"],
    [() => {jssWithPlugins.createStyleSheet(SelectStyles).update(DesignSystem)}, "SelectStyles"],
    [() => {jssWithPlugins.createStyleSheet(SelectOptionStyles).update(DesignSystem)}, "SelectOptionStyles"],
    [() => {jssWithPlugins.createStyleSheet(SliderStyles).update(DesignSystem)}, "SliderStyles"],
    [() => {jssWithPlugins.createStyleSheet(SliderLabelStyles).update(DesignSystem)}, "SliderLabelStyles"],
    [() => {jssWithPlugins.createStyleSheet(StealthButtonStyles).update(DesignSystem)}, "StealthButtonStyles"],
    [() => {jssWithPlugins.createStyleSheet(SubheadingStyles).update(DesignSystem)}, "SubheadingStyles"],
    [() => {jssWithPlugins.createStyleSheet(ToggleStyles).update(DesignSystem)}, "ToggleStyles"],
    [() => {jssWithPlugins.createStyleSheet(TextActionStyles).update(DesignSystem)}, "TextActionStyles"],
    [() => {jssWithPlugins.createStyleSheet(TextAreaStyles).update(DesignSystem)}, "TextAreaStyles"],
    [() => {jssWithPlugins.createStyleSheet(TextFieldStyles).update(DesignSystem)}, "TextFieldStyles"],
    [() => {jssWithPlugins.createStyleSheet(TypographyStyles).update(DesignSystem)}, "TypographyStyles"],
]

const density = getDesignSystemValue("density");
const pluginTestSimpleStyleSheet = {
    className: {
        color: "red",
        "background-color": "blue",
        display: "block",
        position: "relative",
        margin: "0",
        "padding-right": "30px",
        transform: "translateY(12px)",
        borderColor: neutralFillActive,
    }
}

const buttonStylesWithAllPlugins = {
    button: {
        ...applyScaledTypeRamp("t7"),
        fontFamily: "inherit",
        ...applyCursorPointer(),
        boxSizing: "border-box",
        maxWidth: "374px",
        minWidth: (designSystem) => density(designSystem) <= -2 ? "28px" : "32px",
        padding: format("0 {0}", horizontalSpacing(focusOutlineWidth)),
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        height: height(),
        ...applyFocusPlaceholderBorder(),
        ...applyCornerRadius(),
        lineHeight: "1",
        overflow: "hidden",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "all 0.1s ease-in-out",
        color: neutralForegroundRest,
        fill: neutralForegroundRest,
        background: neutralFillRest,
        "&:hover:enabled": {
            background: neutralFillHover,
        },
        "&:active:enabled": {
            background: neutralFillActive,
        },
        ...applyFocusVisible({
            borderColor: neutralFocus,
        }),
        "&::-moz-focus-inner": {
            border: "0",
        },
        "@media (-ms-high-contrast:active)": {
            fill: "ButtonHighlight",
        },
    },
    button__primary: {
        color: accentForegroundCut,
        fill: accentForegroundCut,
        background: accentFillRest,
        "&:hover:enabled": {
            background: accentFillHover,
        },
        "&:active:enabled": {
            background: accentFillActive,
        },
        ...applyFocusVisible({
            borderColor: neutralFocus,
            boxShadow: format(
                "0 0 0 {0} inset {1}",
                toPx(focusOutlineWidth),
                neutralFocusInnerAccent(accentFillRest)
            ),
        }),
        "& $button_beforeContent, & $button_afterContent": {
            fill: accentForegroundCut,
        },
    },
    button__outline: {
        background: "transparent",
        border: format(
            "{0} solid {1}",
            toPx(outlineWidth),
            neutralOutlineRest
        ),
        padding: format("0 {0}", horizontalSpacing(outlineWidth)),
        "&:hover:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx(outlineWidth),
                neutralOutlineHover
            ),
        },
        "&:active:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx(outlineWidth),
                neutralOutlineActive
            ),
        },
        ...applyFocusVisible({
            boxShadow: 
            (designSystem) => {
                return `0 0 0 ${toPx(
                    focusOutlineWidth(designSystem) - outlineWidth(designSystem)
                )} ${neutralFocus(designSystem)} inset`;
            }
            ,
            borderColor: neutralFocus,
        }),
    },
    button__lightweight: {
        color: accentForegroundRest,
        fill: accentForegroundRest,
        background: "transparent",
        ...applyFocusVisible({
            borderColor: "transparent",
            boxShadow: "none",
            "& $button_contentRegion::before": {
                background: neutralForegroundRest,
                height: toPx(focusOutlineWidth),
            },
        }),
        // Underline
        "&:hover $button_contentRegion::before": {
            background: accentForegroundHover,
            "@media (-ms-high-contrast:active)": {
                background: "ButtonHighlight",
            },
        },
        "&:hover$button__disabled $button_contentRegion::before": {
            display: "none",
        },
        "&:active $button_contentRegion::before": {
            background: accentForegroundActive,
        },
        "&$button__disabled, &$button__disabled $button_contentRegion::before": {
            background: "transparent"
        },
        "@media (-ms-high-contrast:active)": {
            border: "none",
            fill: "ButtonHighlight",
        },
        "&:hover:enabled": {
            color: accentForegroundHover,
            fill: accentForegroundHover,
            background: "transparent"
        },
        "&:active:enabled": {
            color: accentForegroundActive,
            fill: accentForegroundActive,
            background: "transparent"
        },
    },
    button__justified: {
        color: accentForegroundRest,
        fill: accentForegroundRest,
        background: "transparent",
        ...applyFocusVisible({
            borderColor: "transparent",
            boxShadow: "none",
            "& $button_contentRegion::before": {
                background: neutralForegroundRest,
                height: toPx(focusOutlineWidth),
            },
        }),
        // Underline
        "&:hover $button_contentRegion::before": {
            background: accentForegroundHover,
            "@media (-ms-high-contrast:active)": {
                background: "ButtonHighlight",
            },
        },
        "&:hover$button__disabled $button_contentRegion::before": {
            display: "none",
        },
        "&:active $button_contentRegion::before": {
            background: accentForegroundActive,
        },
        "&$button__disabled, &$button__disabled $button_contentRegion::before": {
            background: "transparent"
        },
        "@media (-ms-high-contrast:active)": {
            border: "none",
            fill: "ButtonHighlight",
        },
        "&:hover:enabled": {
            color: accentForegroundHover,
            fill: accentForegroundHover,
            background: "transparent"
        },
        "&:active:enabled": {
            color: accentForegroundActive,
            fill: accentForegroundActive,
            background: "transparent"
        },
        minWidth: "74px",
        paddingLeft: "0",
        paddingRight: "0",
        borderWidth: "0",
        justifyContent: "flex-start",
    },
    button__stealth: {
        background: neutralFillStealthRest,
        "&:hover:enabled": {
            backgroundColor: neutralFillStealthHover,
        },
        "&:active:enabled": {
            backgroundColor: neutralFillStealthActive,
        },
        ...applyFocusVisible({
            borderColor: neutralFocus,
        }),
    },
    button_contentRegion: {
        position: "relative",
        "&::before": {
            content: "''",
            display: "block",
            height: toPx(outlineWidth),
            position: "absolute",
            bottom: "-3px",
            width: "100%",
            left: directionSwitch("0", ""),
            right: directionSwitch("", "0"),
        },
        "& svg": {
            width: glyphSize,
            height: glyphSize,
        },
    },
    button__disabled: {
        ...applyDisabledState(),
        "& $button_beforeContent, & $button_afterContent": {
            fill: "ButtonHighlight",
        },
    },
    button_beforeContent: {
        width: glyphSize,
        height: glyphSize,
    },
    button_afterContent: {
        width: glyphSize,
        height: glyphSize,
    },
};
const buttonStylesWithoutAllPlugins = {
    button: {
        ...applyScaledTypeRamp("t7"),
        "font-family": "inherit",
        ...applyCursorPointer(),
        "box-sizing": "border-box",
        "max-width": "374px",
        "min-width": (designSystem) => density(designSystem) <= -2 ? "28px" : "32px",
        padding: format("0 {0}", horizontalSpacing(focusOutlineWidth)),
        display: "inline-flex",
        "justify-content": "center",
        "align-items": "center",
        height: height(),
        ...applyFocusPlaceholderBorder(),
        ...applyCornerRadius(),
        "line-height": "1",
        overflow: "hidden",
        "text-decoration": "none",
        "white-space": "nowrap",
        transition: "all 0.1s ease-in-out",
        color: neutralForegroundRest,
        fill: neutralForegroundRest,
        background: neutralFillRest,
        "&:hover:enabled": {
            background: neutralFillHover,
        },
        "&:active:enabled": {
            background: neutralFillActive,
        },
        ...applyFocusVisible({
            "border-color": neutralFocus,
        }),
        "&::-moz-focus-inner": {
            border: "0",
        },
        "@media (-ms-high-contrast:active)": {
            fill: "ButtonHighlight",
        },
    },
    button__primary: {
        color: accentForegroundCut,
        fill: accentForegroundCut,
        background: accentFillRest,
        "&:hover:enabled": {
            background: accentFillHover,
        },
        "&:active:enabled": {
            background: accentFillActive,
        },
        ...applyFocusVisible({
            "border-color": neutralFocus,
            boxShadow: format(
                "0 0 0 {0} inset {1}",
                toPx(focusOutlineWidth),
                neutralFocusInnerAccent(accentFillRest)
            ),
        }),
        "& $button_beforeContent, & $button_afterContent": {
            fill: accentForegroundCut,
        },
    },
    button__outline: {
        background: "transparent",
        border: format(
            "{0} solid {1}",
            toPx(outlineWidth),
            neutralOutlineRest
        ),
        padding: format("0 {0}", horizontalSpacing(outlineWidth)),
        "&:hover:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx(outlineWidth),
                neutralOutlineHover
            ),
        },
        "&:active:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx(outlineWidth),
                neutralOutlineActive
            ),
        },
        ...applyFocusVisible({
            boxShadow: 
            (designSystem) => {
                return `0 0 0 ${toPx(
                    focusOutlineWidth(designSystem) - outlineWidth(designSystem)
                )} ${neutralFocus(designSystem)} inset`;
            }
            ,
            "border-color": neutralFocus,
        }),
    },
    button__lightweight: {
        color: accentForegroundRest,
        fill: accentForegroundRest,
        background: "transparent",
        ...applyFocusVisible({
            "border-color": "transparent",
            "box-shadow": "none",
            "& $button_contentRegion::before": {
                background: neutralForegroundRest,
                height: toPx(focusOutlineWidth),
            },
        }),
        // Underline
        "&:hover $button_contentRegion::before": {
            background: accentForegroundHover,
            "@media (-ms-high-contrast:active)": {
                background: "ButtonHighlight",
            },
        },
        "&:hover$button__disabled $button_contentRegion::before": {
            display: "none",
        },
        "&:active $button_contentRegion::before": {
            background: accentForegroundActive,
        },
        "&$button__disabled, &$button__disabled $button_contentRegion::before": {
            background: "transparent"
        },
        "@media (-ms-high-contrast:active)": {
            border: "none",
            fill: "ButtonHighlight",
        },
        "&:hover:enabled": {
            color: accentForegroundHover,
            fill: accentForegroundHover,
            background: "transparent"
        },
        "&:active:enabled": {
            color: accentForegroundActive,
            fill: accentForegroundActive,
            background: "transparent"
        },
    },
    button__justified: {
        color: accentForegroundRest,
        fill: accentForegroundRest,
        background: "transparent",
        ...applyFocusVisible({
            "border-color": "transparent",
            "box-shadow": "none",
            "& $button_contentRegion::before": {
                background: neutralForegroundRest,
                height: toPx(focusOutlineWidth),
            },
        }),
        // Underline
        "&:hover $button_contentRegion::before": {
            background: accentForegroundHover,
            "@media (-ms-high-contrast:active)": {
                background: "ButtonHighlight",
            },
        },
        "&:hover$button__disabled $button_contentRegion::before": {
            display: "none",
        },
        "&:active $button_contentRegion::before": {
            background: accentForegroundActive,
        },
        "&$button__disabled, &$button__disabled $button_contentRegion::before": {
            background: "transparent"
        },
        "@media (-ms-high-contrast:active)": {
            border: "none",
            fill: "ButtonHighlight",
        },
        "&:hover:enabled": {
            color: accentForegroundHover,
            fill: accentForegroundHover,
            background: "transparent"
        },
        "&:active:enabled": {
            color: accentForegroundActive,
            fill: accentForegroundActive,
            background: "transparent"
        },
        minWidth: "74px",
        paddingLeft: "0",
        paddingRight: "0",
        borderWidth: "0",
        "justify-content": "flex-start",
    },
    button__stealth: {
        background: neutralFillStealthRest,
        "&:hover:enabled": {
            "background-color": neutralFillStealthHover,
        },
        "&:active:enabled": {
            "background-color": neutralFillStealthActive,
        },
        ...applyFocusVisible({
            "border-color": neutralFocus,
        }),
    },
    button_contentRegion: {
        position: "relative",
        "&::before": {
            content: "''",
            display: "block",
            height: toPx(outlineWidth),
            position: "absolute",
            bottom: "-3px",
            width: "100%",
            left: directionSwitch("0", ""),
            right: directionSwitch("", "0"),
        },
        "& svg": {
            width: glyphSize,
            height: glyphSize,
        },
    },
    button__disabled: {
        ...applyDisabledState(),
        "& $button_beforeContent, & $button_afterContent": {
            fill: "ButtonHighlight",
        },
    },
    button_beforeContent: {
        width: glyphSize,
        height: glyphSize,
    },
    button_afterContent: {
        width: glyphSize,
        height: glyphSize,
    },
};

const jssPluginTests = [
    [() => {jssWithPlugins.createStyleSheet(buttonStylesWithAllPlugins).update(DesignSystem)}, "withPlugins"],
    [() => {jssWithoutPlugins.createStyleSheet(buttonStylesWithoutAllPlugins).update(DesignSystem)}, "withoutPlugins"],
]

function createSuite(data) {
    data.forEach(set => {
        suite.add(set[1], () => {
            set[0](DesignSystem);
        });
    });
}


createSuite(stylesheetRenderers)

suite.on("complete", function() {
    const body = Object.keys(this)
        .filter(key => this[key] && this[key].name && this[key].hz)
        .map(key => ({
            functionName: this[key].name,
            ops: this[key].hz,
            opsMs: this[key].hz / 1000,
        }));
    fs.writeFileSync("./jss-plugins.pre-plugin-removal.json", JSON.stringify(body, null, 4));
});

suite.on("error", (arg) => {
    console.log(JSON.stringify(arg, null, 2))
    throw new Error(arg.message)
})

suite.run();
