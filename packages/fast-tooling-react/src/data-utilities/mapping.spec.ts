import "jest";
import React from "react";
import { ChildOptionItem, mapDataToComponent } from "./";
import { mapDataToCodePreview } from "./mapping";

import ChildrenWithRenderProp from "./__tests__/components/children-plugin";
import Children from "./__tests__/components/children";
import TextField from "./__tests__/components/text-field";
import badgeSchema from "../__tests__/schemas/badge.schema.json";
import childrenWithPluginPropsSchema from "../__tests__/schemas/children-plugin.schema.json";
import {
    MapDataToComponentPlugin,
    MapDataToComponentPluginProps,
} from "./mapping.data-to-component.plugin";
import { pluginIdKeyword } from "./types";
import { MapDataToComponentReactChildrenPlugin } from "./mapping.data-to-component.children.plugin";
import reactChildrenSchema, {
    defaultReactChildrenPluginId,
} from "./react-children.schema";
import childrenSchema from "../__tests__/schemas/children.schema";
import textFieldSchema from "../__tests__/schemas/text-field.schema";
import { MapDataToCodePreviewReactChildrenPlugin } from "./mapping.data-to-code-preview.children.plugin";

/* tslint:disable:max-classes-per-file */

class TestMapDataToComponentPlugin extends MapDataToComponentPlugin<
    MapDataToComponentPluginProps
> {
    public resolver(data: any, dataLocation?: string): any {
        return "foo";
    }
}

class TestComponent extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return null;
    }
}

describe("mapDataToComponent", () => {
    const childrenPluginResolverId: string =
        childrenWithPluginPropsSchema.reactProperties.render.pluginId;
    const arrayPluginResolverId: string =
        childrenWithPluginPropsSchema.properties.array.pluginId;
    const booleanPluginResolverId: string =
        childrenWithPluginPropsSchema.properties.boolean.pluginId;
    const childOptions: ChildOptionItem[] = [
        { component: Children, schema: childrenSchema },
        { component: TextField, schema: textFieldSchema },
        { component: ChildrenWithRenderProp, schema: childrenWithPluginPropsSchema },
    ];

    test("should map data to a component", () => {
        const props: any = {
            foo: "bar",
        };
        const componentWithMappedData: any = mapDataToComponent(
            {
                type: "object",
                properties: {
                    foo: {
                        type: "string",
                    },
                },
            },
            props,
            TestComponent
        );

        expect(typeof componentWithMappedData.type).toBe("function");
        expect(componentWithMappedData.props).toEqual(props);
    });
    test("should map data to a plugin", () => {
        const id: string = "bar";
        const componentWithMappedData: any = mapDataToComponent(
            {
                type: "object",
                properties: {
                    foo: {
                        [pluginIdKeyword]: id,
                        type: "string",
                    },
                },
            },
            {
                foo: "bar",
            },
            TestComponent,
            [
                new TestMapDataToComponentPlugin({
                    id,
                }),
            ]
        );

        expect(typeof componentWithMappedData.type).toBe("function");
        expect(componentWithMappedData.props).toEqual({
            foo: "foo",
        });
    });
    describe("MapDataToComponentReactChildrenPlugin", () => {
        test("should map data to a string child", () => {
            const id: string = "bar";
            const componentWithMappedData: any = mapDataToComponent(
                {
                    type: "object",
                    properties: {
                        foo: {
                            [pluginIdKeyword]: id,
                            type: "string",
                        },
                    },
                },
                {
                    foo: "bar",
                },
                TestComponent,
                [
                    new MapDataToComponentReactChildrenPlugin({
                        id,
                        childOptions,
                    }),
                ]
            );

            expect(typeof componentWithMappedData.type).toBe("function");
            expect(componentWithMappedData.props).toEqual({
                foo: "bar",
            });
        });
        test("should map data to a component", () => {
            const componentWithMappedData: any = mapDataToComponent(
                {
                    type: "object",
                    properties: {
                        foo: {
                            ...reactChildrenSchema,
                        },
                    },
                },
                {
                    foo: {
                        id: textFieldSchema.id,
                        props: {},
                    },
                },
                TestComponent,
                [
                    new MapDataToComponentReactChildrenPlugin({
                        id: defaultReactChildrenPluginId,
                        childOptions,
                    }),
                ]
            );

            expect(typeof componentWithMappedData.type).toBe("function");
            expect(typeof componentWithMappedData.props.foo.type).toEqual("function");
            expect(componentWithMappedData.props.foo.type.displayName).toEqual(
                "Text field"
            );
        });
        test("should map data to multiple strings", () => {
            const componentWithMappedData: any = mapDataToComponent(
                {
                    type: "object",
                    properties: {
                        foo: {
                            ...reactChildrenSchema,
                        },
                    },
                },
                {
                    foo: ["hello", "world"],
                },
                TestComponent,
                [
                    new MapDataToComponentReactChildrenPlugin({
                        id: defaultReactChildrenPluginId,
                        childOptions,
                    }),
                ]
            );

            expect(typeof componentWithMappedData.type).toBe("function");
            expect(componentWithMappedData.props).toEqual({
                foo: ["hello", "world"],
            });
        });
        test("should map data to mixed children types", () => {
            const componentWithMappedData: any = mapDataToComponent(
                {
                    type: "object",
                    properties: {
                        foo: {
                            ...reactChildrenSchema,
                        },
                    },
                },
                {
                    foo: [
                        "hello",
                        {
                            id: textFieldSchema.id,
                            props: {},
                        },
                    ],
                },
                TestComponent,
                [
                    new MapDataToComponentReactChildrenPlugin({
                        id: defaultReactChildrenPluginId,
                        childOptions,
                    }),
                ]
            );

            expect(typeof componentWithMappedData.type).toBe("function");
            expect(componentWithMappedData.props.foo[0]).toEqual("hello");
            expect(typeof componentWithMappedData.props.foo[1].type).toEqual("function");
            expect(componentWithMappedData.props.foo[1].type.displayName).toEqual(
                "Text field"
            );
        });
        test("should map data to nested children", () => {
            const componentWithMappedData: any = mapDataToComponent(
                {
                    type: "object",
                    properties: {
                        foo: {
                            ...reactChildrenSchema,
                        },
                    },
                },
                {
                    foo: {
                        id: childrenSchema.id,
                        props: {
                            children: {
                                id: textFieldSchema.id,
                                props: {},
                            },
                        },
                    },
                },
                TestComponent,
                [
                    new MapDataToComponentReactChildrenPlugin({
                        id: defaultReactChildrenPluginId,
                        childOptions,
                    }),
                ]
            );

            expect(typeof componentWithMappedData.type).toBe("function");
            expect(typeof componentWithMappedData.props.foo.type).toEqual("function");
            expect(componentWithMappedData.props.foo.type.displayName).toEqual(
                "Children"
            );
            expect(typeof componentWithMappedData.props.foo.props.children.type).toEqual(
                "function"
            );
            expect(
                componentWithMappedData.props.foo.props.children.type.displayName
            ).toEqual("Text field");
        });
    });
});

describe("mapDataToCodePreview", () => {
    const childrenJSXName: string = "Children";
    const badgeJSXName: string = "Badge";
    const tabIndent: string = "    ";

    test("should return a string", () => {
        const mappedData: string = mapDataToCodePreview({
            data: {},
            schema: badgeSchema,
            componentName: badgeJSXName,
        });

        expect(typeof mappedData).toBe("string");
    });
    test("should return a string containing a self closing JSX element", () => {
        const mappedData: string = mapDataToCodePreview({
            data: {},
            schema: badgeSchema,
            componentName: badgeJSXName,
        });

        expect(mappedData).toEqual(`<${badgeJSXName} />`);
    });
    test("should return a string containing a self closing JSX element with props", () => {
        const mappedData: string = mapDataToCodePreview({
            data: {
                string: "Foo",
                boolean: true,
                number: 42,
            },
            schema: badgeSchema,
            componentName: badgeJSXName,
        });

        expect(mappedData).toEqual(
            `<${badgeJSXName}\n${tabIndent}string={"Foo"}\n${tabIndent}boolean={true}\n${tabIndent}number={42}\n/>`
        );
    });
    test("should return a string containing a JSX element with a string children", () => {
        const mappedData: string = mapDataToCodePreview({
            data: {
                children: "foo",
            },
            schema: childrenSchema,
            componentName: childrenJSXName,
        });

        expect(mappedData).toEqual(
            `<${childrenJSXName}>\n${tabIndent}foo\n</${childrenJSXName}>`
        );
    });
    test("should return a string containing a JSX element with multiple string children", () => {
        const childData: any = ["foo", "bar"];
        const mappedData: string = mapDataToCodePreview({
            data: {
                children: childData,
            },
            schema: childrenSchema,
            componentName: childrenJSXName,
        });

        expect(mappedData).toEqual(
            `const children12 = ${JSON.stringify(
                childData,
                null,
                2
            )};\n\n<${childrenJSXName}\n${tabIndent}children={children12}\n/>`
        );
    });
    describe("plugin MapDataToCodePreviewReactChildrenPlugin", () => {
        test("should return a string containing a string child", () => {
            const childData: any = "foo";
            const mappedData: string = mapDataToCodePreview({
                data: {
                    children: childData,
                },
                schema: childrenSchema,
                componentName: childrenJSXName,
                plugins: [
                    new MapDataToCodePreviewReactChildrenPlugin({
                        id: childrenSchema.properties.children[pluginIdKeyword],
                        childOptions: [],
                    }),
                ],
            });

            expect(mappedData).toEqual(`<Children>\n${tabIndent}foo\n</Children>`);
        });
        test("should return a string containing multiple string children", () => {
            const childData: any = ["foo", "bar"];
            const mappedData: string = mapDataToCodePreview({
                data: {
                    children: childData,
                },
                schema: childrenSchema,
                componentName: childrenJSXName,
                plugins: [
                    new MapDataToCodePreviewReactChildrenPlugin({
                        id: childrenSchema.properties.children[pluginIdKeyword],
                        childOptions: [],
                    }),
                ],
            });

            expect(mappedData).toEqual(
                `<Children>\n${tabIndent}foo\n${tabIndent}bar\n</Children>`
            );
        });
        test("should return a string containing a component child", () => {
            const childData: any = {
                id: badgeSchema.id,
                props: {
                    string: "foo",
                },
            };
            const mappedData: string = mapDataToCodePreview({
                data: {
                    children: childData,
                },
                schema: childrenSchema,
                componentName: childrenJSXName,
                plugins: [
                    new MapDataToCodePreviewReactChildrenPlugin({
                        id: childrenSchema.properties.children[pluginIdKeyword],
                        childOptions: [
                            {
                                component: null,
                                name: "Badge",
                                schema: badgeSchema,
                            },
                        ],
                    }),
                ],
            });

            expect(mappedData).toEqual(
                `<Children>\n${tabIndent}<Badge\n${tabIndent}${tabIndent}string={"foo"}\n${tabIndent}/>\n</Children>`
            );
        });
        test("should return a string containing multiple component children", () => {
            const childData: any = [
                {
                    id: textFieldSchema.id,
                    props: {},
                },
                {
                    id: badgeSchema.id,
                    props: {
                        string: "foo",
                    },
                },
            ];
            const mappedData: string = mapDataToCodePreview({
                data: {
                    children: childData,
                },
                schema: childrenSchema,
                componentName: childrenJSXName,
                plugins: [
                    new MapDataToCodePreviewReactChildrenPlugin({
                        id: childrenSchema.properties.children[pluginIdKeyword],
                        childOptions: [
                            {
                                component: null,
                                name: "Badge",
                                schema: badgeSchema,
                            },
                            {
                                component: null,
                                name: "TextField",
                                schema: textFieldSchema,
                            },
                        ],
                    }),
                ],
            });

            expect(mappedData).toEqual(
                `<Children>\n${tabIndent}<TextField />\n${tabIndent}<Badge\n${tabIndent}${tabIndent}string={"foo"}\n${tabIndent}/>\n</Children>`
            );
        });
        test("should return a string containing a component child and a string child", () => {
            const childData: any = [
                "foo",
                {
                    id: badgeSchema.id,
                    props: {
                        string: "foo",
                    },
                },
            ];
            const mappedData: string = mapDataToCodePreview({
                data: {
                    children: childData,
                },
                schema: childrenSchema,
                componentName: childrenJSXName,
                plugins: [
                    new MapDataToCodePreviewReactChildrenPlugin({
                        id: childrenSchema.properties.children[pluginIdKeyword],
                        childOptions: [
                            {
                                component: null,
                                name: "Badge",
                                schema: badgeSchema,
                            },
                            {
                                component: null,
                                name: "TextField",
                                schema: textFieldSchema,
                            },
                        ],
                    }),
                ],
            });

            expect(mappedData).toEqual(
                `<Children>\n${tabIndent}foo\n${tabIndent}<Badge\n${tabIndent}${tabIndent}string={"foo"}\n${tabIndent}/>\n</Children>`
            );
        });
    });
});
/* tslint:disable:max-classes-per-file */
