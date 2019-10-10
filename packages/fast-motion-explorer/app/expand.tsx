import {
    applyElevatedCornerRadius,
    applyElevation,
    backgroundColor,
    bezier,
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
import { revealProgress, elevateTransition } from "./recipes";
import { AppState } from "./state";
import { TransitionStates, useTransition } from "./useTransition";

export interface ElevationClassNameContract {
    elevation: string;
    elevation_initial: string;
    elevation_entering: string;
    elevation_exiting: string;
}

export interface ElevationProps extends ManagedClasses<ElevationClassNameContract> {
    children?: React.ReactNode;
    managedClasses: ElevationClassNameContract;
    width: number;
    height: number;
    elevated: boolean;
    designSystem: DesignSystem;
}

const stylesheet: ComponentStyleSheet<ElevationClassNameContract, DesignSystem> = {
    elevation: {
        "margin-top": "auto",
        "margin-bottom": "auto",
        background: backgroundColor,
        ...applyElevatedCornerRadius(),
        "z-index": "1",
        transition: elevateTransition,
    },
    elevation_initial: {
        ...applyElevation(ElevationMultiplier.e4),
    },
    elevation_entering: {
        ...applyElevation(ElevationMultiplier.e12),
    },
    elevation_exiting: {
        ...applyElevation(ElevationMultiplier.e4),
    },
};

function Elevation(props: ElevationProps): JSX.Element {
    const {
        elevation,
        elevation_initial,
        elevation_entering,
        elevation_exiting,
    }: ElevationClassNameContract = props.managedClasses;
    const value: TransitionStates = useTransition(
        props.elevated,
        relativeDuration(props.designSystem)
    );

    return (
        <div
            style={{width: props.width, height: props.height}}
            className={classNames(
                elevation,
                [elevation_initial, value === TransitionStates.initial],
                [
                    elevation_entering,
                    value === TransitionStates.entered ||
                        value === TransitionStates.entering,
                ],
                [elevation_exiting, value === TransitionStates.exiting]
            )}
        >
            {props.children}
        </div>
    );
}

function mapStateToProps(state: AppState): Partial<ElevationProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Elevation));
