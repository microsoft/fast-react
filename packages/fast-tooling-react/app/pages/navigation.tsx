import React from "react";
import { Navigation } from "../../src";
import childrenSchema from "./navigation/children.schema.json";
import { childOptions, children } from "./navigation/example.data";
import {
    MessageSystemComponentTypeAction,
    MessageSystemDataTypeAction,
    MessageSystemType,
} from "../../src/message-system/message-system.props";

export interface NavigationTestPageState {
    data: any;
    navigation: any;
    dragAndDropReordering: boolean;
}

let fastMessageSystemWebWorker: Worker | void;

class NavigationTestPage extends React.Component<{}, NavigationTestPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            data: {},
            navigation: void 0,
            dragAndDropReordering: false,
        };

        if ((window as any).Worker) {
            fastMessageSystemWebWorker = new Worker("message-system.js");
            fastMessageSystemWebWorker.onmessage = this.handleMessageSystem;
            fastMessageSystemWebWorker.postMessage({
                type: MessageSystemType.initialize,
                data: children,
                schema: childrenSchema,
            });
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                <input
                    type={"checkbox"}
                    id={"dragAndDropReordering"}
                    value={this.state.dragAndDropReordering.toString()}
                    onChange={this.handleUpdateDragAndDropReordering}
                />
                <label htmlFor={"dragAndDropReordering"}>Drag and drop reordering</label>
                <Navigation
                    navigation={this.state.navigation || {}}
                    messageSystem={fastMessageSystemWebWorker}
                    schema={childrenSchema}
                    childOptions={childOptions}
                    onChange={this.handleChange}
                    dragAndDropReordering={this.state.dragAndDropReordering}
                />
                <h2>Navigation</h2>
                <pre>{JSON.stringify(this.state.navigation, null, 2)}</pre>
                <h2>Data</h2>
                <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </div>
        );
    }

    private handleMessageSystem = (e: MessageEvent): void => {
        if (e.data.type === MessageSystemType.initialize) {
            this.setState({
                navigation: e.data.navigation,
                data: e.data.data,
            });
        }
    };

    private handleChange = (data: any): void => {
        this.setState({
            data,
        });
    };

    private handleUpdateDragAndDropReordering = (): void => {
        this.setState({
            dragAndDropReordering: !this.state.dragAndDropReordering,
        });
    };
}

export { NavigationTestPage };
