import { Background, Heading, HeadingSize } from "@microsoft/fast-components-react-msft";
import { DesignSystem, neutralLayerL4 } from "@microsoft/fast-components-styles-msft";
import manageJss, { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";
import { Canvas, Container, Row } from "@microsoft/fast-layouts-react";
import { memoize } from "lodash-es";
import React from "react";
import { connect } from "react-redux";
import { ControlPane } from "./control-pane";
import Dialog from "./dialog";
import Elevation from "./elevation";
import Expand from "./expand";
import Slide from "./slide";
import {
    allRelativeMotionExampleTypes,
    Animations,
    AppState,
    RelativeMotionExampleTypes,
    relativeMotionPresets,
} from "./state";

/* tslint:disable-next-line */
interface AppProps extends AppState {}

interface AppComponentState {
    visible: boolean;
    elevated: boolean;
    expanded: boolean;
    slide: boolean;
}
class App extends React.Component<AppProps, AppComponentState> {
    private containerStyleOverrides: any = {
        container: {
            width: "100%",
            height: "100%",
        },
    };

    private headingStyleOverrides: any = {
        heading: {
            margin: "16px 0",
        },
    };

    private designSystemByRelativeMotion: (
        value: number
    ) => Partial<DesignSystem> = memoize((value: number) => {
        return { relativeMotion: value };
    });

    constructor(props: AppProps) {
        super(props);

        this.state = {
            visible: false,
            elevated: false,
            expanded: false,
            slide: false,
        };
    }

    public render(): React.ReactNode {
        return (
            <DesignSystemProvider designSystem={this.props.designSystem}>
                <Container>
                    <Row fill={true}>
                        <Canvas>
                            <Container jssStyleSheet={this.containerStyleOverrides}>
                                <Row fill={true}>
                                    <div
                                        style={{
                                            display: "flex",
                                            minWidth: "100%",
                                            overflow: "auto",
                                        }}
                                    >
                                        {allRelativeMotionExampleTypes.map(
                                            this.renderAnimationPane
                                        )}
                                    </div>
                                </Row>
                            </Container>
                        </Canvas>
                        <Background value={"#000000"} tag={null}>
                            <Background value={neutralLayerL4}>
                                <ControlPane onPlayClick={this.handlePlayAnimationClick} />
                            </Background>
                        </Background>
                    </Row>
                </Container>
            </DesignSystemProvider>
        );
    }

    private renderAnimationPane = (
        type: RelativeMotionExampleTypes
    ): JSX.Element | null => {
        if (!this.props.activeRelativeMotionExamples.includes(type)) {
            return null;
        }

        const designSystem: Partial<DesignSystem> =
            type === "custom"
            ? this.props.designSystem
            : this.designSystemByRelativeMotion(relativeMotionPresets[type]);

        return (
            <DesignSystemProvider designSystem={designSystem} key={type}>
                <div
                    style={{
                        flex: "1",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            minWidth: "300px",
                    }}
                >
                    <Heading
                        size={HeadingSize._7}
                        jssStyleSheet={this.headingStyleOverrides}
                    >
                        {type}
                    </Heading>
                    <div
                        style={{
                            display: "flex",
                                flex: "1",
                                justifyContent: "center",
                                alignItems: "center",
                        }}
                    >
                        {this.props.animation === Animations.revealDismiss ? (
                            <Dialog
                                width={200}
                                height={200}
                                visible={this.state.visible}
                            />
                        ) : null}
                        {this.props.animation === Animations.elevate ? (
                            <Elevation
                                width={200}
                                height={200}
                                elevated={this.state.elevated}
                            />
                        ) : null}
                        {this.props.animation === Animations.expand ? (
                            <Expand expanded={this.state.expanded} />
                        ) : null}
                        {this.props.animation === Animations.slide ? (
                            <Slide slide={this.state.slide} />
                        ) : null}
                    </div>
                </div>
            </DesignSystemProvider>
        );
    };

    private handlePlayAnimationClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        switch (this.props.animation) {
            case Animations.revealDismiss:
                this.setState({ visible: !this.state.visible });
                break;
            case Animations.elevate:
                this.setState({ elevated: !this.state.elevated });
                break;
            case Animations.expand:
                this.setState({ expanded: !this.state.expanded });
                break;
            case Animations.slide:
                this.setState({ slide: !this.state.slide });
                break;
        }
    };
}

function mapStateToProps(state: AppState): Partial<AppProps> {
    return state;
}

export default connect(mapStateToProps)(
    manageJss({
        "@global": {
            body: {
                fontFamily: '"Segoe UI", Arial, sans-serif',
                fontSize: "14px",
                margin: "0",
            },
        },
    })(App)
);
