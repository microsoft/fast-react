import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import {
    applyFocusVisible,
    directionSwitch,
    format,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { CarouselClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    neutralFillStealthHoverCustomProperty,
    neutralFillStealthHoverDefinition,
    neutralFillStealthRestCustomProperty,
    neutralFillStealthRestDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralForegroundRestCustomProperty,
    neutralForegroundRestDefinition,
    neutralOutlineRestCustomProperty,
    neutralOutlineRestDefinition,
} from "../../utilities/color";
import { DesignSystem, DesignSystemResolver } from "../../design-system";
import {
    designUnit,
    focusOutlineWidth,
    outlineWidth,
} from "../../utilities/design-system";
import {
    highContrastButtonColorIndicator,
    HighContrastColor,
    highContrastColorBackground,
    highContrastForeground,
    highContrastHighlightColorIndicator,
    highContrastOptOutProperty,
    highContrastSelector,
} from "../../utilities/high-contrast";

const white: string = "#FFFFFF";
const black: string = "#101010";
const themeDarkneutralForegroundRestCustomProperty = neutralForegroundRestCustomProperty;
const themeLightneutralForegroundRestCustomProperty = neutralForegroundRestCustomProperty;
const themeDarkneutralFillStealthRestCustomProperty = neutralFillStealthRestCustomProperty;
const themeLightneutralFillStealthRestCustomProperty = neutralFillStealthRestCustomProperty;

const themeDarkneutralOutlineRestCustomProperty = neutralOutlineRestCustomProperty;
const themeLightneutralOutlineRestCustomProperty = neutralOutlineRestCustomProperty;

const themeDarkneutralFocusCustomProperty = neutralFocusCustomProperty;
const themeLightneutralFocusCustomProperty = neutralFocusCustomProperty;

function flipperStyles(): CSSRules<{}> {
    return {
        position: "absolute",
        top: "calc(50% - 20px)",
        "z-index": "100",
        opacity: "0",
        transition: "all 0.2s ease-in-out",
    };
}
const styles: ComponentStyles<CarouselClassNameContract, DesignSystem> = {
    carousel: {
        position: "relative",
        display: "inline-block",
        "&:hover": {
            "& $carousel_flipperPrevious, & $carousel_flipperNext": {
                opacity: "1",
            },
        },
        [highContrastSelector]: {
            ...highContrastOptOutProperty,
        },
    },
    carousel_slides: {},
    carousel_sequenceIndicators: {
        position: "absolute",
        bottom: "4px",
        display: "inline-flex",
        padding: "0",
        "text-align": "center",
        "z-index": "100",
        "max-width": "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "& > :first-child:nth-last-child(1)": {
            display: "none",
        },
    },
    carousel_sequenceIndicator: {
        display: "inline-block",
        padding: "4px",
        position: "relative",
        "&:focus": {
            outline: "none",
        },
        ...applyFocusVisible<DesignSystem>({
            "&::after": {
                position: "absolute",
                border: format("{0} solid transparent", toPx(focusOutlineWidth)),
                "border-radius": "40px",
                top: "0",
                right: "0",
                left: "0",
                bottom: "0",
                content: "''",
                display: "block",
                transition: "all 0.05s ease-in-out",
            },
        }),
        "&::before": {
            opacity: "0.45",
            border: "1px solid transparent",
            "border-radius": "40px",
            content: "''",
            display: "block",
            height: toPx<DesignSystem>(designUnit),
            width: "32px",
            transition: "all 0.05s ease-in-out",
        },
        "&:not($carousel_sequenceIndicator__active)": {
            "&:hover": {
                "&::before": {
                    opacity: "0.9",
                    ...highContrastHighlightColorIndicator,
                },
            },
        },
    },
    carousel_sequenceIndicator__active: {
        "&::before": {
            opacity: "1",
        },
    },
    carousel_tabPanel: {
        display: "block",
    },
    carousel_tabPanel__hidden: {
        display: "none",
    },
    carousel_tabPanels: {},
    carousel_tabPanelContent: {},
    carousel_flipperPrevious: {
        ...flipperStyles(),
        left: directionSwitch("6px", ""),
        right: directionSwitch("", "6px"),
    },
    carousel_flipperNext: {
        ...flipperStyles(),
        right: directionSwitch("6px", ""),
        left: directionSwitch("", "6px"),
    },
    carousel__themeDark: {
        "& $carousel_flipperPrevious, & $carousel_flipperNext": {
            "&::before": {
                color: themeDarkneutralForegroundRestCustomProperty,
                fill: themeDarkneutralForegroundRestCustomProperty,
                background: themeDarkneutralFillStealthRestCustomProperty,
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    themeDarkneutralOutlineRestCustomProperty
                ),
                ...highContrastColorBackground,
            },
            "& span::before": {
                "border-color": themeDarkneutralForegroundRestCustomProperty,
            },
            "&:hover": {
                "&::before": {
                    background: neutralFillStealthHoverCustomProperty,
                    [highContrastSelector]: {
                        background: HighContrastColor.selectedBackground,
                        border: format(
                            "{0} solid {1}",
                            toPx<DesignSystem>(outlineWidth),
                            () => HighContrastColor.selectedText
                        ),
                    },
                },
                "& span::before": {
                    "border-color": themeDarkneutralForegroundRestCustomProperty,
                },
            },
            "& > svg": {
                fill: themeDarkneutralForegroundRestCustomProperty,
                ...highContrastForeground,
            },
            [highContrastSelector]: {
                background: "none",
            },
        },
        "& $carousel_sequenceIndicator": {
            "&::before": {
                background: themeDarkneutralFillStealthRestCustomProperty,
                "border-color": themeDarkneutralOutlineRestCustomProperty,
                ...highContrastButtonColorIndicator,
            },
            "&::after": {
                "border-color": themeDarkneutralFocusCustomProperty,
            },
            "&$carousel_sequenceIndicator__active": {
                "&::before": {
                    background: themeDarkneutralFillStealthRestCustomProperty,
                    ...highContrastHighlightColorIndicator,
                },
            },
        },
    },
    carousel__themeLight: {
        "& $carousel_flipperPrevious, & $carousel_flipperNext": {
            "&::before": {
                color: themeLightneutralForegroundRestCustomProperty,
                fill: themeLightneutralForegroundRestCustomProperty,
                background: themeLightneutralFillStealthRestCustomProperty,
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    themeLightneutralOutlineRestCustomProperty
                ),
                ...highContrastColorBackground,
            },
            "& span::before": {
                "border-color": themeLightneutralForegroundRestCustomProperty,
            },
            "&:hover": {
                "&::before": {
                    background: neutralFillStealthHoverCustomProperty,
                    [highContrastSelector]: {
                        background: HighContrastColor.selectedBackground,
                        border: format(
                            "{0} solid {1}",
                            toPx<DesignSystem>(outlineWidth),
                            () => HighContrastColor.selectedText
                        ),
                    },
                },
                "& span::before": {
                    "border-color": themeLightneutralForegroundRestCustomProperty,
                },
            },
            "& > svg": {
                fill: themeLightneutralForegroundRestCustomProperty,
                ...highContrastForeground,
            },
            [highContrastSelector]: {
                background: "none",
            },
        },
        "& $carousel_sequenceIndicator": {
            "&::before": {
                background: themeLightneutralFillStealthRestCustomProperty,
                "border-color": themeLightneutralOutlineRestCustomProperty,
                ...highContrastButtonColorIndicator,
            },
            "&::after": {
                "border-color": themeLightneutralFocusCustomProperty,
            },
            "&$carousel_sequenceIndicator__active": {
                "&::before": {
                    background: themeLightneutralFillStealthRestCustomProperty,
                    ...highContrastHighlightColorIndicator,
                },
            },
        },
    },
    carousel__slideAnimatePrevious: {},
    carousel__slideAnimateNext: {},
};

export default styles;
export const carouselDependencies = [
    neutralFillStealthHoverDefinition,
    neutralFillStealthRestDefinition,
    neutralFocusDefinition,
    neutralForegroundRestDefinition,
    neutralOutlineRestDefinition,
];
