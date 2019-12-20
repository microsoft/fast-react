import React from "react";
import { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";
import * as testConfigs from "../form/";
import { mapDataToCodePreview } from "../../../src/data-utilities/mapping";
import { MapCodePreviewConfig } from "../../../src/data-utilities/mapping.props";
import exampleData, { childOptions } from "./examples.data";
import { ChildOptionItem } from "../../../dist";
import childrenSchema from "../../../src/__tests__/schemas/children.schema";

export interface CodePreviewTestPageState {
    config: MapCodePreviewConfig;
}

const codePreviewChildOptions: ChildOptionItem[] = [
    {
        name: "TextField",
        schema: testConfigs.textField.schema,
        component: null,
    },
    {
        name: "Children",
        schema: testConfigs.children.schema,
        component: null,
    },
];

const designSystemDefaults: any = {
    foregroundColor: "#000",
    backgroundColor: "#FFF",
    brandColor: "#0078D4",
};

class CodePreviewTestPage extends React.Component<{}, CodePreviewTestPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            config: {
                schema: childrenSchema,
                data: exampleData[0].config.data,
                componentName: "Children",
            },
        };
    }

    public render(): JSX.Element {
        return (
            <DesignSystemProvider designSystem={designSystemDefaults}>
                <div>
                    <div>
                        <select onChange={this.handleComponentUpdate}>
                            {this.getComponentOptions()}
                        </select>
                        <br />
                    </div>
                    <pre
                        style={{
                            padding: "12px",
                            background: "rgb(244, 245, 246)",
                            borderRadius: "4px",
                        }}
                    >
                        {mapDataToCodePreview(this.state.config)}
                    </pre>
                    `
                </div>
            </DesignSystemProvider>
        );
    }

    private handleComponentUpdate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({
            config: {
                schema: exampleData[e.target.selectedIndex].config.schema,
                data: exampleData[e.target.selectedIndex].config.data,
                componentName: exampleData[e.target.selectedIndex].config.componentName,
            },
        });
    };

    private getComponentOptions(): JSX.Element[] {
        return Object.keys(exampleData).map((testComponentKey: any, index: number) => {
            return <option key={index}>{exampleData[index].exampleName}</option>;
        });
    }
}

export { CodePreviewTestPage };
