import {
    applyElevatedCornerRadius,
    applyElevation,
    backgroundColor,
    DesignSystem,
    ElevationMultiplier,
    relativeDuration,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { connect } from "react-redux";
import { slideTransition } from "./recipes";
import { AppState } from "./state";
import { TransitionStates, useTransition } from "./useTransition";

export interface SlideClassNameContract {
    slide: string;
    slide_initial: string;
    slide_entering: string;
    slide_exiting: string;
}

export interface SlideProps extends ManagedClasses<SlideClassNameContract> {
    children?: React.ReactNode;
    managedClasses: SlideClassNameContract;
    slide: boolean;
    designSystem: DesignSystem;
}

const stylesheet: ComponentStyleSheet<SlideClassNameContract, DesignSystem> = {
    slide: {
        "margin-top": "auto",
        "margin-bottom": "auto",
        background: backgroundColor,
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e10),
        "z-index": "1",
        transition: slideTransition(800)("transform"),
        width: "200px",
        height: "200px",
    },
    slide_initial: {
        transform: "translateX(-400px)"
    },
    slide_entering: {
        transform: "translateX(400px)"
    },
    slide_exiting: {
        transform: "translateX(-400px)"
    },
};

function Slide(props: SlideProps): JSX.Element {
    const {
        slide,
        slide_initial,
        slide_entering,
        slide_exiting,
    }: SlideClassNameContract = props.managedClasses;
    const value: TransitionStates = useTransition(
        props.slide,
        relativeDuration(props.designSystem)
    );

    return (
        <div
            className={classNames(
                slide,
                [slide_initial, value === TransitionStates.initial],
                [
                    slide_entering,
                    value === TransitionStates.entered ||
                        value === TransitionStates.entering,
                ],
                [slide_exiting, value === TransitionStates.exiting]
            )}
        >
            {props.children}
        </div>
    );
}

function mapStateToProps(state: AppState): Partial<SlideProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Slide));
