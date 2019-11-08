import {
    applyElevatedCornerRadius,
    applyElevation,
    backgroundColor,
    bezier,
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
import {
    elevateFromProperties,
    elevateToProperties,
    elevateTransition,
} from "./recipies/elevate";
import { AppState } from "./state";
import { TransitionStates, useBinaryTransitionState } from "./useTransition";

export interface ElevationClassNameContract {
    elevation: string;
    elevation_initial: string;
    elevation_entering: string;
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
        background: neutralFillCard,
        ...applyElevatedCornerRadius(),
        "z-index": "1",
        transition: elevateTransition,
    },
    elevation_initial: {
        ...elevateFromProperties(ElevationMultiplier.e4),
    },
    elevation_entering: {
        ...elevateToProperties(ElevationMultiplier.e12),
    },
};

function Elevation(props: ElevationProps): JSX.Element {
    const {
        elevation,
        elevation_initial,
        elevation_entering,
    }: ElevationClassNameContract = props.managedClasses;
    const value: TransitionStates = useBinaryTransitionState(
        props.elevated,
        relativeDuration(props.designSystem)
    );

    return (
        <div
            style={{ width: props.width, height: props.height }}
            className={classNames(
                elevation,
                [elevation_initial, value === TransitionStates.from],
                [elevation_entering, value === TransitionStates.to]
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
