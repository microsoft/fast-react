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
import { expandTransition } from "./recipies/expand";
import { AppState } from "./state";
import { TransitionStates, useBinaryTransitionState } from "./use-transition";

export interface ExpandClassNameContract {
    expand: string;
    expand_initial: string;
    expand_entering: string;
}

export interface ExpandProps extends ManagedClasses<ExpandClassNameContract> {
    children?: React.ReactNode;
    managedClasses: ExpandClassNameContract;
    expanded: boolean;
    designSystem: DesignSystem;
}

const stylesheet: ComponentStyleSheet<ExpandClassNameContract, DesignSystem> = {
    expand: {
        "margin-top": "auto",
        "margin-bottom": "auto",
        background: neutralFillCard,
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e10),
        "z-index": "1",
        transition: expandTransition("width", "height"),
    },
    expand_initial: {
        width: "200px",
        height: "200px",
    },
    expand_entering: {
        width: "290px",
        height: "290px",
    },
};

function Expand(props: ExpandProps): JSX.Element {
    const {
        expand,
        expand_initial,
        expand_entering,
    }: ExpandClassNameContract = props.managedClasses;
    const value: TransitionStates = useBinaryTransitionState(
        props.expanded,
        relativeDuration(props.designSystem)
    );

    return (
        <div
            className={classNames(
                expand,
                [expand_initial, value === TransitionStates.from],
                [expand_entering, value === TransitionStates.to]
            )}
        >
            {props.children}
        </div>
    );
}

function mapStateToProps(state: AppState): Partial<ExpandProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default (connect(mapStateToProps) as any)(manageJss(stylesheet)(Expand));
