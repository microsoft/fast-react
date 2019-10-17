import { DesignSystem, DesignSystemResolver } from "../design-system";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { directionSwitch, format, toPx } from "@microsoft/fast-jss-utilities";
import {
    neutralFillStealthHover,
    neutralFillStealthRest,
    neutralForegroundRest,
    neutralOutlineRest,
} from "../utilities/color";
import { CarouselClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { designUnit, outlineWidth } from "../utilities/design-system";
import {
    highContrastHighlightBackground,
    highContrastSelector,
} from "../utilities/high-contrast";

const white: string = "#FFF";
const black: string = "#101010";
const darkModeNeutralForegroundRest: DesignSystemResolver<string> = neutralForegroundRest(
    (): string => black
);
const lightModeNeutralForegroundRest: DesignSystemResolver<
    string
> = neutralForegroundRest((): string => white);
const darkModeNeutralFillStealthRest: DesignSystemResolver<
    string
> = neutralFillStealthRest((): string => black);
const lightModeNeutralFillStealthRest: DesignSystemResolver<
    string
> = neutralFillStealthRest((): string => white);

const darkModeNeutralOutlineRest: DesignSystemResolver<string> = neutralOutlineRest(
    (): string => black
);
const lightModeNeutralOutlineRest: DesignSystemResolver<string> = neutralOutlineRest(
    (): string => white
);

function applyThemeStyles(theme: "light" | "dark"): CSSRules<DesignSystem> {
    const isDark: boolean = theme === "dark";
    const currentNeutralForegroudRest: DesignSystemResolver<string> = isDark
        ? darkModeNeutralForegroundRest
        : lightModeNeutralForegroundRest;
    const currentNeutralFillStealthRest: DesignSystemResolver<string> = isDark
        ? darkModeNeutralFillStealthRest
        : lightModeNeutralFillStealthRest;
    const currentNeutralOutlineRest: DesignSystemResolver<string> = isDark
        ? darkModeNeutralOutlineRest
        : lightModeNeutralOutlineRest;

    return {
        "& $carousel_flipperPrevious, & $carousel_flipperNext": {
            "&::before": {
                color: currentNeutralForegroudRest,
                fill: currentNeutralForegroudRest,
                background: currentNeutralFillStealthRest,
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    currentNeutralOutlineRest
                ),
            },
            "& span::before": {
                "border-color": currentNeutralOutlineRest,
            },
            "&:hover": {
                "&::before": {
                    background: neutralFillStealthHover(
                        (): string => (isDark ? black : white)
                    ),
                    [highContrastSelector]: {
                        background: "Highlight",
                        border: format(
                            "{0} solid HighlightText",
                            toPx<DesignSystem>(outlineWidth)
                        ),
                    },
                },
                "& span::before": {
                    "border-color": currentNeutralForegroudRest,
                },
            },
            "& > svg": {
                fill: currentNeutralForegroudRest,
                [highContrastSelector]: {
                    fill: "ButtonText",
                },
            },
        },
        "& $carousel_sequenceIndicator": {
            "&::before": {
                background: currentNeutralFillStealthRest,
                "border-color": currentNeutralOutlineRest,
            },
            "&$carousel_sequenceIndicator__active": {
                "&::before": {
                    background: currentNeutralFillStealthRest,
                    ...highContrastHighlightBackground,
                },
            },
        },
    };
}

const styles: ComponentStyles<CarouselClassNameContract, DesignSystem> = {
    carousel: {
        position: "relative",
        "&:hover": {
            "& $carousel_flipper": {
                opacity: "1",
            },
        },
    },
    carousel_slides: {},
    carousel_sequenceIndicators: {
        position: "absolute",
        bottom: "8px",
        display: "block",
        padding: "0",
        "text-align": "center",
        width: "100%",
        "z-index": "100",
        "& > :first-child:nth-last-child(1)": {
            display: "none",
        },
    },
    carousel_sequenceIndicator: {
        display: "inline-block",
        padding: "0 2px",
        "&:focus": {
            outline: "none",
        },
        "&::before": {
            opacity: "0.45",
            border: "1px solid transparent",
            "border-radius": "40px",
            content: "''",
            display: "block",
            height: toPx<DesignSystem>(designUnit),
            width: "32px",
            transition: "all 0.05s ease-in-out",
            [highContrastSelector]: {
                opacity: "1",
                background: "ButtonFace",
                "border-color": "ButtonText",
            },
        },
        "&:not($carousel_sequenceIndicator__active)": {
            "&:hover": {
                "&::before": {
                    opacity: "0.9",
                    [highContrastSelector]: {
                        opacity: "1",
                        background: "Highlight",
                        "border-color": "HighlightText",
                    },
                },
            },
        },
    },
    carousel_sequenceIndicator__active: {
        "&::before": {
            opacity: "1",
            [highContrastSelector]: {
                "border-color": "HighlightText",
            },
        },
    },
    carousel_tabPanel: {
        display: "block",
    },
    carousel_tabPanel__hidden: {
        display: "none",
    },
    carousel_tabPanels: {},
    arousel_tabPanelContent: {},
    carousel_flipper: {
        position: "absolute",
        top: "calc(50% - 20px)",
        "z-index": "100",
        opacity: "0",
        transition: "all 0.2s ease-in-out",
    },
    carousel_flipperPrevious: {
        left: directionSwitch("6px", ""),
        right: directionSwitch("", "6px"),
    },
    carousel_flipperNext: {
        right: directionSwitch("6px", ""),
        left: directionSwitch("", "6px"),
    },
    carousel__themeDark: {
        ...applyThemeStyles("dark")
    },
    carousel__themeLight: {
        ...applyThemeStyles("light")
    },
    carousel__slideAnimatePrevious: {},
    carousel__slideAnimateNext: {},
};

export default styles;
