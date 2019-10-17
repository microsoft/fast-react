import {
    Button,
    ButtonAppearance,
    Heading,
    HeadingSize,
    HeadingTag,
    Label,
    Select,
    SelectOption,
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
import { updateAnimation, updateDesignSystem } from "./action-creators";
import { Animations, AppState, relativeMotionPresets } from "./state";

export interface ControlPaneClassNameContract {
    controlPane: string;
}

export interface ControlPaneProps extends ManagedClasses<ControlPaneClassNameContract> {
    designSystem: DesignSystem;
    updateDesignSystem: typeof updateDesignSystem;
    updateAnimation: typeof updateAnimation;
    animation: Animations;
    onPlayClick: React.MouseEventHandler<HTMLButtonElement>;
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
                    <Button
                        style={this.inputStyles}
                        appearance={ButtonAppearance.primary}
                        onClick={this.props.onPlayClick}
                    >
                        Play animation
                    </Button>
                    {this.renderAnimationInput()}
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
            <div>
                <Label style={this.labelStyles} htmlFor="motion-level">
                    Relative motion
                </Label>
                <Slider
                    style={this.inputStyles}
                    id="motion-level"
                    onValueChange={this.onRelativeMotionChange}
                    range={{ minValue: 0, maxValue: 1 }}
                    step={0.01}
                    value={this.props.designSystem.relativeMotion}
                >
                    {Object.entries(relativeMotionPresets).map(
                        (value: [string, number]): JSX.Element => {
                            return (
                                <SliderLabel
                                    key={value[0]}
                                    valuePositionBinding={value[1]}
                                    label={value[0]}
                                />
                            );
                        }
                    )}
                </Slider>
            </div>
        );
    }

    private onRelativeMotionChange = (value: number): void => {
        this.props.updateDesignSystem("relativeMotion", value);
    };

    private renderAnimationInput(): JSX.Element {
        return (
            <div>
                <Label style={this.labelStyles} htmlFor="animation">
                    Animation type
                </Label>
                <Select
                    id={"animation"}
                    selectedItems={[this.props.animation]}
                    style={{ zIndex: 1, position: "relative", ...this.inputStyles }}
                    onValueChange={this.props.updateAnimation}
                >
                    {Object.entries(Animations).map(
                        (value: [string, string]): JSX.Element => {
                            const val: string = value[1];
                            return (
                                <SelectOption
                                    key={val}
                                    id={val}
                                    value={val}
                                    displayString={val}
                                />
                            );
                        }
                    )}
                </Select>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): AppState {
    return state;
}

/* tslint:disable-next-line */
const ControlPane = connect(
    mapStateToProps,
    {
        updateDesignSystem,
        updateAnimation,
    }
)(manageJss(styles)(ControlPaneBase));
type ControlPane = InstanceType<typeof ControlPane>;
export { ControlPane };
