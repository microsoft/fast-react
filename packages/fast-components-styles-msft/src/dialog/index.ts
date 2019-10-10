import { DesignSystem, DesignSystemResolver } from "../design-system";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { applyElevatedCornerRadius } from "../utilities/border";
import { backgroundColor, relativeMotion } from "../utilities/design-system";
import { applyElevation, ElevationMultiplier } from "../utilities/elevation";
import { highContrastBorder } from "../utilities/high-contrast";
import { multiply, toMs, toPx } from "@microsoft/fast-jss-utilities";
import { DialogClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { bezier, duration } from "../utilities/motion";

/*
 * Reveal is relative to size of animating object. we quantify that with dimension
 */
function revealTransform(dimension: number): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const scaledMotion: number = relativeMotion(designSystem) * 20;
        const scale: number = 100 - 2000 / dimension - scaledMotion;

        return `translateX(${toPx(scaledMotion)}) scale(${scale / 100})`;
    };
}

// const reveal: any = {
//     from: {
//         opacity: "0",
//         "box-shadow": "none",
//         transform: revealTransform
//     },
//     to: {
//         opacity: "1",
//         ...applyElevation(ElevationMultiplier.e14),
//         transform: "translateX(0), scale(1)"
//     },
// };

const styles: ComponentStyles<DialogClassNameContract, DesignSystem> = {
    // "@keyframes reveal": {
    //     from: {
    //         opacity: "0",
    //         "box-shadow": "none",
    //         transform: revealTransform(400),
    //     },
    //     to: {
    //         opacity: "1",
    //         ...applyElevation(ElevationMultiplier.e14),
    //         transform: "translateX(0) scale(1)",
    //     },
    // },
    // "@keyframes dismiss": {
    //     from: {
    //         opacity: "0",
    //         "box-shadow": "none",
    //         transform: revealTransform(400),
    //     },
    //     to: {
    //         opacity: "1",
    //         ...applyElevation(ElevationMultiplier.e14),
    //         transform: "translateX(0) scale(1)",
    //     },
    // },
    dialog: {
        display: "none",
        "&.enter": {
            display: "block",
            "& $dialog_contentRegion": {
            }
        },
        "&.enter-active $dialog_contentRegion": {
            opacity: "1",
            ...applyElevation(ElevationMultiplier.e14),
            transform: "translateX(0), scale(1)"
        },
        "&.enter-done": {
            display: "block",
        },
        "&.exit-active": {},
        "&.exit-done": {},
    },
    dialog_positioningRegion: {
        display: "flex",
        "justify-content": "center",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        overflow: "auto",
    },
    dialog_modalOverlay: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "rgba(0, 0, 0, 0.3)",
    },
    dialog_contentRegion: {
        "margin-top": "auto",
        "margin-bottom": "auto",
        background: backgroundColor,
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e14),
        "z-index": "1",
        ...highContrastBorder,
        // initial transition state
        opacity: "0",
        "box-shadow": "none",
        transform: revealTransform(400)
    },
};

export default styles;
