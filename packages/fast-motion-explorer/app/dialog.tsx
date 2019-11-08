import {
    applyElevatedCornerRadius,
    applyElevation,
    DesignSystem,
    ElevationMultiplier,
    neutralFillCard,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { connect } from "react-redux";
import { dismissDuration, dismissToProperties } from "./recipies/dismiss";
import {
    revealDuration,
    revealFromProperties,
    revealToProperties,
} from "./recipies/reveal";
import { AppState } from "./state";
import { TransitionStates, useTransitionState } from "./use-transition";

export interface DialogClassNameContract {
    dialog: string;
    dialog_initial: string;
    dialog_entering: string;
    dialog_exiting: string;
}

export interface DialogProps extends ManagedClasses<DialogClassNameContract> {
    children?: React.ReactNode;
    managedClasses: DialogClassNameContract;
    width: number;
    height: number;
    visible: boolean;
    designSystem: DesignSystem;
}

const stylesheet: ComponentStyleSheet<DialogClassNameContract, DesignSystem> = {
    dialog: {
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e14),
        width: "200px",
        height: "200px",
        background: neutralFillCard,
    },
    dialog_initial: {
        ...revealFromProperties(200),
    },
    dialog_entering: {
        ...revealToProperties,
    },
    dialog_exiting: {
        ...dismissToProperties(200),
    },
};

function Dialog(props: DialogProps): JSX.Element {
    const {
        dialog,
        dialog_initial,
        dialog_entering,
        dialog_exiting,
    }: DialogClassNameContract = props.managedClasses;
    const value: TransitionStates = useTransitionState(props.visible, {
        in: revealDuration(props.designSystem),
        out: dismissDuration(props.designSystem),
    });

    return (
        <div
            className={classNames(
                dialog,
                [dialog_initial, value === TransitionStates.from],
                [dialog_entering, value === TransitionStates.to],
                [dialog_exiting, value === TransitionStates.out]
            )}
        >
            {props.children}
        </div>
    );
}

function mapStateToProps(state: AppState): Partial<DialogProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Dialog));
