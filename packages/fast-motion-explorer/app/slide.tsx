import {
    applyElevatedCornerRadius,
    applyElevation,
    backgroundColor,
    DesignSystem,
    ElevationMultiplier,
    neutralFillCard,
    relativeDuration,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { connect } from "react-redux";
import { slideTransition } from "./recipies/slide";
import { AppState } from "./state";
import {
    TransitionStates,
    useTransitionState,
} from "@microsoft/fast-components-react-msft";

export interface SlideClassNameContract {
    slide: string;
    slide_initial: string;
    slide_entering: string;
}

export interface SlideProps extends ManagedClasses<SlideClassNameContract> {
    children?: React.ReactNode;
    managedClasses: SlideClassNameContract;
    slide: boolean;
    designSystem: DesignSystem;
}

const stylesheet: ComponentStyleSheet<SlideClassNameContract, DesignSystem> = {
    slide: {
        background: neutralFillCard,
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e10),
        "z-index": "1",
        transition: slideTransition(200)("transform"),
        width: "200px",
        height: "200px",
    },
    slide_initial: {
        transform: "translateY(-100px)",
    },
    slide_entering: {
        transform: "translateY(100px)",
    },
};

function Slide(props: SlideProps): JSX.Element {
    const {
        slide,
        slide_initial,
        slide_entering,
    }: SlideClassNameContract = props.managedClasses;
    const value: TransitionStates = useTransitionState(
        props.slide,
        relativeDuration(props.designSystem)
    );

    return (
        <div
            className={classNames(
                slide,
                [
                    slide_initial,
                    value === TransitionStates.inactive ||
                        value === TransitionStates.deactivating,
                ],
                [
                    slide_entering,
                    value === TransitionStates.active ||
                        value === TransitionStates.activating,
                ]
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
