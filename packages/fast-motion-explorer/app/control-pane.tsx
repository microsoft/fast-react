import { Heading, HeadingSize, HeadingTag } from "@microsoft/fast-components-react-msft";
import {
    backgroundColor,
    DesignSystem,
    elevation,
    ElevationMultiplier,
    neutralForegroundRest,
} from "@microsoft/fast-components-styles-msft";
import manageJss, {
    ComponentStyleSheet,
    ManagedClasses,
} from "@microsoft/fast-jss-manager-react";
import { Pane } from "@microsoft/fast-layouts-react";
import { get } from "lodash-es";
import React from "react";
import { connect } from "react-redux";
import { AppState } from "./state";

export interface ControlPaneClassNameContract {
    controlPane: string;
}

export interface ControlPaneProps extends ManagedClasses<ControlPaneClassNameContract> {
    designSystem: DesignSystem;
}

const styles: any = (
    designSystem: DesignSystem
): ComponentStyleSheet<any, DesignSystem> => {
    return {
        controlPane: {
            position: "relative",
            zIndex: "1",
            padding: "12px",
            boxSizing: "border-box",
            color: neutralForegroundRest,
            height: "100%",
            maxWidth: "300px",
            boxShadow: (config: DesignSystem): string => {
                return (elevation(ElevationMultiplier.e7)(undefined as any) as any)
                    .boxShadow;
            },
            background: backgroundColor,
        },
    };
};

function titleCase(str: string): string {
    return str
        .split("")
        .reduce((accumulated: string, value: string, index: number): string => {
            return accumulated.concat(index === 0 ? value.toUpperCase() : value);
        }, "");
}
class ControlPaneBase extends React.Component<ControlPaneProps> {
    private labelStyles: React.CSSProperties = {
        marginBottom: "8px",
    };

    private inputStyles: React.CSSProperties = {
        marginBottom: "18px",
        width: "100%",
    };

    public render(): React.ReactNode {
        return (
            <Pane className={get(this.props.managedClasses, "controlPane", "")}>
                <form onSubmit={this.handleFormSubmit}>
                    <Heading
                        size={HeadingSize._5}
                        tag={HeadingTag.h2}
                        style={this.labelStyles}
                    >
                        Settings
                    </Heading>
                </form>
            </Pane>
        );
    }

    private handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }
}

function mapStateToProps(state: AppState): AppState {
    return state;
}

/* tslint:disable-next-line */
const ControlPane = connect(mapStateToProps)(manageJss(styles)(ControlPaneBase));
type ControlPane = InstanceType<typeof ControlPane>;
export { ControlPane };
