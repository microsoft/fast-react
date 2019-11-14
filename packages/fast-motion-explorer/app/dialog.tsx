import {
    applyElevatedCornerRadius,
    applyElevation,
    bezier,
    DesignSystem,
    ElevationMultiplier,
    neutralFillCard,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    designSystemContext,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { dismissDuration, dismissToProperties } from "./recipies/dismiss";
import {
    revealDuration,
    revealFromProperties,
    revealToProperties,
} from "./recipies/reveal";
import { AppState } from "./state";
import {
    TransitionStates,
    useTransition,
    useTransitionState,
} from "@microsoft/fast-components-react-msft";

export interface DialogClassNameContract {
    dialog: string;
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
};

function Dialog(props: DialogProps): JSX.Element {
    const { dialog }: DialogClassNameContract = props.managedClasses;
    const context: DesignSystem = useContext<DesignSystem>(designSystemContext as any);

    const transition: string = useTransition(props.visible, {
        duration: [revealDuration(context), dismissDuration(context)],
        timingFunction: bezier(context),
        inactive: { ...revealFromProperties(props.width) },
        active: {
            transform: "translateX(0) scale(1)",
            opacity: "1",
        },
        deactivating: {
            ...dismissToProperties(props.width),
        },
    });

    return <div className={classNames(dialog, transition)}>{props.children}</div>;
}

function mapStateToProps(state: AppState): Partial<DialogProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Dialog));
