import {
    applyElevatedCornerRadius,
    applyElevation,
    backgroundColor,
    DesignSystem,
    ElevationMultiplier,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { connect } from "react-redux";
import {
    dismissDuration,
    dismissProgress,
    revealDuration,
    revealInitial,
    revealProgress,
} from "./recipes";
import { AppState } from "./state";
import { TransitionStates, useTransition } from "./useTransition";

export interface DialogClassNameContract {
    dialog: string;
    dialog_initial: string;
    dialog_entering: string;
    dialog_exiting: string;
    dialog_modalOverlay: string;
    dialog_positioningRegion: string;
    dialog_contentRegion: string;
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
    dialog: {},
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
    },
    dialog_initial: {
        "& $dialog_contentRegion": {
            ...revealInitial,
        },
    },
    dialog_entering: {
        "& $dialog_contentRegion": {
            ...revealProgress,
        },
    },
    dialog_exiting: {
        "& $dialog_contentRegion": {
            ...dismissProgress,
        },
    },
};

function Dialog(props: DialogProps): JSX.Element {
    const {
        dialog,
        dialog_positioningRegion,
        dialog_contentRegion,
        dialog_initial,
        dialog_entering,
        dialog_exiting,
    }: DialogClassNameContract = props.managedClasses;
    const value: TransitionStates = useTransition(props.visible, {
        in: revealDuration(props.designSystem),
        out: dismissDuration(props.designSystem),
    });

    return (
        <React.Fragment>
            <div
                className={classNames(
                    dialog,
                    [dialog_initial, value === TransitionStates.initial],
                    [
                        dialog_entering,
                        value === TransitionStates.entered ||
                            value === TransitionStates.entering,
                    ],
                    [dialog_exiting, value === TransitionStates.exiting]
                )}
            >
                <div className={classNames(dialog_positioningRegion)}>
                    <div
                        role="dialog"
                        tabIndex={-1}
                        className={classNames(dialog_contentRegion)}
                        style={{
                            height: props.height,
                            width: props.width,
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function mapStateToProps(state: AppState): Partial<DialogProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Dialog));
