import {
    Heading,
    HeadingSize,
    HeadingTag,
    Label,
    Slider,
    SliderLabel,
} from "@microsoft/fast-components-react-msft";
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
import { updateDesignSystem } from "./actions";

export interface ControlPaneClassNameContract {
    controlPane: string;
}

export interface ControlPaneProps extends ManagedClasses<ControlPaneClassNameContract> {
    designSystem: DesignSystem,
    updateDesignSystem: typeof updateDesignSystem
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
                    {this.renderRelativeMotionInput()}
                </form>
            </Pane>
        );
    }

    private handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    private renderRelativeMotionInput(): JSX.Element {
        return (
            <React.Fragment>
                <Label htmlFor="motion-level">Relative motion</Label>
                <Slider
                    id="motion-level"
                    onValueChange={this.onRelativeMotionChange}
                    range={{ minValue: 0, maxValue: 1 }}
                    step={0.01}
                    value={this.props.designSystem.relativeMotion}
                >
                    <SliderLabel valuePositionBinding={0} label="None" />
                    <SliderLabel valuePositionBinding={0.2} label="Minimal" />
                    <SliderLabel valuePositionBinding={0.4} label="Subtle" />
                    <SliderLabel valuePositionBinding={0.6} label="Default" />
                    <SliderLabel valuePositionBinding={0.8} label="Extra" />
                    <SliderLabel valuePositionBinding={1} label="Expressive" />
                </Slider>
            </React.Fragment>
        );
    }

    private onRelativeMotionChange = (value: number): void => {
        this.props.updateDesignSystem("relativeMotion", value);
    };
}

function mapStateToProps(state: AppState): AppState {
    return state;
}

/* tslint:disable-next-line */
const ControlPane = connect(
    mapStateToProps,
    {
        updateDesignSystem,
    }
)(manageJss(styles)(ControlPaneBase));
type ControlPane = InstanceType<typeof ControlPane>;
export { ControlPane };
