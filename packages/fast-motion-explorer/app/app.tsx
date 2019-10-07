/* tslint:disable:jsx-no-lambda */
/* tslint:disable:no-empty */
import { Background } from "@microsoft/fast-components-react-msft";
import { neutralLayerL4 } from "@microsoft/fast-components-styles-msft";
import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import manageJss, { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";
import { Canvas, Container, Row } from "@microsoft/fast-layouts-react";
import React from "react";
import { connect } from "react-redux";
import { ControlPane } from "./control-pane";
import { AppState } from "./state";

interface AppProps {
    designSystem: DesignSystem;
}

class App extends React.Component<AppProps, {}> {
    private containerStyleOverrides: any = {
        container: {
            width: "100%",
            height: "100%",
        },
    };

    public render(): React.ReactNode {
        return (
            <DesignSystemProvider designSystem={this.props.designSystem}>
                <Container>
                    <Row fill={true}>
                        <Canvas>
                            <Container jssStyleSheet={this.containerStyleOverrides}>
                                <Row fill={true}>Hello world</Row>
                            </Container>
                        </Canvas>
                        <Background value={neutralLayerL4}>
                            <ControlPane />
                        </Background>
                    </Row>
                </Container>
            </DesignSystemProvider>
        );
    }
}

function mapStateToProps(state: AppState): Partial<AppProps> {
    return {
        designSystem: state.designSystem,
    };
}

export default connect(mapStateToProps)(
    manageJss({
        "@global": {
            body: {
                fontFamily: '"Segoe UI", Arial, sans-serif',
                fontSize: "14px",
                margin: "0"
            },
        },
    })(App)
);
