import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import {
    applyFocusVisible,
    directionSwitch,
    ellipsis,
    format,
    important,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import { applyCornerRadius, applyFocusPlaceholderBorder } from "../../utilities/border";
import {
    neutralFillStealthHoverCustomProperty,
    neutralFillStealthHoverDefinition,
    neutralFillStealthRestCustomProperty,
    neutralFillStealthRestDefinition,
    neutralFillStealthSelectedCustomProperty,
    neutralFillStealthSelectedDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralForegroundRestCustomProperty,
    neutralForegroundRestDefinition,
} from "../../utilities/color";
import { applyCursorDefault, applyCursorPointer } from "../../utilities/cursor";
import { glyphSize, height, horizontalSpacing } from "../../utilities/density";
import { designUnit, focusOutlineWidth } from "../../utilities/design-system";
import { applyDisabledState } from "../../utilities/disabled";
import { applyScaledTypeRamp } from "../../utilities/typography";
import {
    HighContrastColor,
    highContrastDisabledBorder,
    highContrastOutlineFocus,
    highContrastSelected,
    highContrastSelector,
    highContrastStealth,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<SelectOptionClassNameContract, DesignSystem> = {
    selectOption: {
        "list-style-type": "none",
        "box-sizing": "border-box",
        height: height(),
        display: "flex",
        "align-items": "center",
        padding: format("0 {0}", horizontalSpacing(focusOutlineWidth)),
        margin: format("0 {0}", toPx(designUnit)),
        color: neutralForegroundRestCustomProperty,
        fill: neutralForegroundRestCustomProperty,
        "white-space": "nowrap",
        overflow: "hidden",
        ...applyCursorDefault(),
        ...applyScaledTypeRamp("t7"),
        background: neutralFillStealthRestCustomProperty,
        ...applyCursorPointer(),
        ...applyCornerRadius(),
        ...applyFocusPlaceholderBorder(),
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocusCustomProperty,
            ...highContrastOutlineFocus,
        }),
        "&:hover": {
            background: neutralFillStealthHoverCustomProperty,
            ...highContrastSelected,
        },
        ...highContrastStealth,
    },
    selectOption_contentRegion: {
        overflow: "hidden",
        ...ellipsis(),
    },
    selectOption_glyph: {
        display: "inline-block",
        position: "relative",
        width: glyphSize,
        height: glyphSize,
        "flex-shrink": "0",
        margin: directionSwitch(
            format("0 {0} 0 0", horizontalSpacing()),
            format("0 0 0 {0}", horizontalSpacing())
        ),
    },
    selectOption__disabled: {
        ...applyDisabledState(),
        ...highContrastDisabledBorder,
        "&, &:hover": {
            background: neutralFillStealthRestCustomProperty,
        },
    },
    selectOption__selected: {
        [highContrastSelector]: {
            background: important(HighContrastColor.selectedBackground),
            "border-color": important(HighContrastColor.buttonText),
            color: important(HighContrastColor.selectedText),
            fill: important(HighContrastColor.selectedText),
        },
        background: neutralFillStealthSelectedCustomProperty,
        "&:hover": {
            background: neutralFillStealthSelectedCustomProperty,
        },
    },
};

export default styles;
export const selectOptionDependencies = [
    neutralFillStealthHoverDefinition,
    neutralFillStealthRestDefinition,
    neutralFillStealthSelectedDefinition,
    neutralFocusDefinition,
    neutralForegroundRestDefinition,
];
