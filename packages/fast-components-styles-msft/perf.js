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
} from "./src/utilities/color";
const Benchmark = require("benchmark");
import fs from "fs";

var suite = new Benchmark.Suite();
const jssWithPlugins = create(preset());
const jssWithoutPlugins = create();

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

const jssPluginTests = [
    [() => {jssWithPlugins.createStyleSheet(pluginTestSimpleStyleSheet).update(DesignSystem)}, "withPlugins"],
    [() => {jssWithoutPlugins.createStyleSheet(pluginTestSimpleStyleSheet).update(DesignSystem)}, "withoutPlugins"],
]

function createSuite(data) {
    data.forEach(set => {
        suite.add(set[1], () => {
            set[0](DesignSystem);
        });
    });
}


createSuite(jssPluginTests)

suite.on("complete", function() {
    const body = Object.keys(this)
        .filter(key => this[key] && this[key].name && this[key].hz)
        .map(key => ({
            functionName: this[key].name,
            ops: this[key].hz,
            opsMs: this[key].hz / 1000,
        }));
    fs.writeFileSync("./jss-plugins.json", JSON.stringify(body, null, 4));
});

suite.run();
