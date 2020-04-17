import {
    applyFocusVisible,
    directionSwitch,
    format,
} from "@microsoft/fast-jss-utilities";
import { AutoSuggestOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { ellipsis, toPx } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../../design-system";
import { height, horizontalSpacing } from "../../utilities/density";
import {
    neutralFillStealthHover,
    neutralFillStealthHoverCustomProperty,
    neutralFillStealthRest,
    neutralFillStealthRestCustomProperty,
    neutralFillStealthSelected,
    neutralFillStealthSelectedCustomProperty,
    neutralFocus,
    neutralFocusCustomProperty,
    neutralForegroundRest,
    neutralForegroundRestCustomProperty,
} from "../../utilities/color";
import { applyScaledTypeRamp } from "../../utilities/typography";
import { applyCornerRadius, applyFocusPlaceholderBorder } from "../../utilities/border";
import { applyCursorDefault } from "../../utilities/cursor";
import { applyDisabledState } from "../../utilities/disabled";
import { designUnit } from "../../utilities/design-system";
import {
    HighContrastColor,
    highContrastDisabled,
    highContrastSelected,
    highContrastSelector,
    highContrastStealth,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<AutoSuggestOptionClassNameContract, DesignSystem> = {
    autoSuggestOption: {
        "list-style-type": "none",
        height: height(),
        display: "grid",
        "grid-template-columns": directionSwitch(
            format("{0} auto auto 1fr {0}", horizontalSpacing()),
            format("{0} 1fr auto auto {0}", horizontalSpacing())
        ),
        "grid-template-rows": "auto",
        "align-items": "center",
        padding: "0",
        margin: format("0 {0}", toPx(designUnit)),
        "white-space": "nowrap",
        overflow: "hidden",
        ...applyCursorDefault(),
        color: neutralForegroundRestCustomProperty,
        ...applyScaledTypeRamp("t7"),
        background: neutralFillStealthRestCustomProperty,
        ...applyCornerRadius(),
        ...applyFocusPlaceholderBorder(),
        ...applyFocusVisible<DesignSystem>({
            "border-color": neutralFocusCustomProperty,
            [highContrastSelector]: {
                background: HighContrastColor.selectedBackground,
                color: HighContrastColor.selectedText,
            },
        }),
        "&:hover": {
            background: neutralFillStealthHoverCustomProperty,
            ...highContrastSelected,
        },
        ...highContrastStealth,
    },
    autoSuggestOption_contentRegion: {
        "grid-column-start": "3",
        overflow: "hidden",
        ...ellipsis(),
    },
    autoSuggestOption__disabled: {
        ...applyDisabledState(),
        ...highContrastDisabled,
        "&:hover": {
            background: neutralFillStealthRestCustomProperty,
            ...highContrastDisabled,
        },
    },
    autoSuggestOption__selected: {
        background: neutralFillStealthSelectedCustomProperty,
        "&:hover": {
            background: neutralFillStealthSelectedCustomProperty,
            ...highContrastSelected,
        },
    },
};

export default styles;
export const autoSuggestOptionDependencies = [
    [neutralFillStealthHoverCustomProperty, neutralFillStealthHover],
    [neutralFillStealthRestCustomProperty, neutralFillStealthRest],
    [neutralFillStealthSelectedCustomProperty, neutralFillStealthSelected],
    [neutralFocusCustomProperty, neutralFocus],
    [neutralForegroundRestCustomProperty, neutralForegroundRest],
];
