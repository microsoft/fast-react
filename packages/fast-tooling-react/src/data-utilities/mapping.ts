import React from "react";
import { cloneDeep, get, isEmpty, isObject, set, uniqueId } from "lodash-es";
import {
    MapDataToComponentPlugin,
    MapDataToComponentPluginProps,
} from "./mapping.data-to-component.plugin";
import {
    MappedDataLocation,
    pluginIdKeyword,
    PluginLocation,
    PluginResolverDataMap,
    PluginResolverDataMapConfig,
} from "./types";
import { getDataLocationsOfPlugins, mapSchemaLocationFromDataLocation } from "./location";
import { Arguments } from "../typings";
import {
    MapDataToCodePreview,
    MapDataToCodePreviewProps,
} from "./mapping.data-to-code-preview.plugin";
import {
    AttributeConfig,
    AttributeRender,
    AttributesConfig,
    AttributeType,
    CodePreviewRenderType,
    ComponentCodePreviewConfig,
    MapCodePreviewConfig,
    standardTabIndent,
} from "./mapping.props";

/**
 * Maps data returned from the form generator to the React components
 */
export function mapDataToComponent(
    schema: any,
    data: any,
    component: React.FunctionComponent<{}> | React.ComponentClass<{}, any>,
    plugins: Array<MapDataToComponentPlugin<MapDataToComponentPluginProps>> = []
): any {
    const mappedData: any = cloneDeep(data);
    const key: { key: string } = { key: uniqueId(schema.id) };
    const pluginLocations: PluginLocation[] = getDataLocationsOfPlugins(
        schema,
        mappedData
    ).sort(orderMappedDataByDataLocation);

    pluginLocations.forEach(
        (pluginLocation: PluginLocation): void => {
            mapPluginToData(pluginLocation as PluginLocation, mappedData, plugins);
        }
    );

    const createElementArguments: Arguments<typeof React.createElement> = [
        component,
        { ...key, ...mappedData },
    ];

    return React.createElement.apply(this, createElementArguments);
}

/**
 * Get the resolved data from a plugin and the data location to map to
 */
function getPluginResolverDataMap(
    pluginResolverDataMapConfig: PluginResolverDataMapConfig
): PluginResolverDataMap[] {
    const pluginResolverMapping: PluginResolverDataMap[] = [];
    const {
        pluginResolver,
        dataLocation,
        pluginData,
    }: PluginResolverDataMapConfig = pluginResolverDataMapConfig;

    pluginResolver.updatePlugins(pluginResolverDataMapConfig.plugins);

    pluginResolverMapping.push({
        dataLocation,
        data: pluginResolver.resolver(pluginData, dataLocation),
    });

    return pluginResolverMapping;
}

function mapPluginToData(
    pluginModifiedDataLocation: PluginLocation,
    data: any,
    plugins: Array<MapDataToComponentPlugin<MapDataToComponentPluginProps>>
): any {
    const {
        dataLocation,
        schema,
        relativeDataLocation,
    }: PluginLocation = pluginModifiedDataLocation;
    const schemaLocation: string = mapSchemaLocationFromDataLocation(
        relativeDataLocation,
        schema,
        data
    );
    const pluginId: string = get(schema, `${schemaLocation}.${pluginIdKeyword}`);
    const pluginResolver: MapDataToComponentPlugin<
        MapDataToComponentPluginProps
    > = plugins.find(
        (plugin: MapDataToComponentPlugin<MapDataToComponentPluginProps>): boolean =>
            plugin.matches(pluginId)
    );
    const pluginData: any = get(data, dataLocation);

    if (pluginResolver !== undefined) {
        getPluginResolverDataMap({
            pluginData,
            pluginResolver,
            dataLocation,
            plugins,
        }).forEach(
            (pluginResolverMappingItem: PluginResolverDataMap): void => {
                // This data mutation is intentional.
                // We don't clone data here because this function is always called on data that has previously been cloned. It also
                // may contain react nodes - and cloning react nodes has massive negative performance impacts.
                set(data, dataLocation, pluginResolverMappingItem.data);
            }
        );
    }

    return data;
}

/**
 * Used as a sort compare function
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
function orderMappedDataByDataLocation(
    a: MappedDataLocation,
    b: MappedDataLocation
): number {
    const A: number = a.dataLocation.split(".").length;
    const B: number = b.dataLocation.split(".").length;

    return A > B ? -1 : A < B ? 1 : 0;
}

/**
 * Maps data to the code preview, a string that conforms to JSX syntax
 */
export function mapDataToCodePreview(codePreviewConfig: MapCodePreviewConfig): string {
    const codePreview: ComponentCodePreview = new ComponentCodePreview(codePreviewConfig);

    return codePreview.render();
}

/**
 * A class which creates a formatted code preview when initialized
 * and provides methods for retrieving that preview
 */
class ComponentCodePreview {
    /**
     * Number of tabs to indent
     */
    private _tabIndent: number = 0;

    /**
     * The string to use as the tab indent
     */
    private _renderedTabIndent: string = "";

    /**
     * The name of the component to be used in the tag
     */
    private _componentName: string = "Undefined";

    /**
     * The component variables, used for data too complex for
     * inline JSX attributes
     */
    private variables: string[];

    /**
     * Plugins
     */
    private plugins: Array<MapDataToCodePreview<MapDataToCodePreviewProps>> = [];

    /**
     * The components inline attributes
     */
    private inlineAttributes: string = "";

    /**
     * The JSX element as a string
     */
    private jsx: string = "";

    /**
     * The nested items as a string
     */
    private nested: { [key: string]: string } = {};

    constructor(props: MapCodePreviewConfig) {
        this.variables = [];
        this.plugins = props.plugins || [];
        this._componentName = props.componentName;
        this._tabIndent = props.tabIndent || this._tabIndent;
        // Due to a strange behavioral quirk where a new array with empty values cannot
        // be interpreted by the reduce method unless the values are at least undefined,
        // two new arrays are created to create an array of undefined values.
        this._renderedTabIndent = new Array(...new Array(this._tabIndent)).reduce(
            (accumulation: string) => {
                return `${accumulation}${standardTabIndent}`;
            },
            ""
        );

        this.getComponentCodePreview({
            data: props.data,
            schema: props.schema,
            tabIndent: "",
            componentName: props.componentName,
            renderType: CodePreviewRenderType.openTag,
        });
    }

    /**
     * Renders the code preview
     */
    public render = (): string => {
        return (
            this.variables.reduce(
                (variables: string, variable: string) => variables + variable,
                ""
            ) + this.jsx
        );
    };

    private renderOpenTag(data: any, schema: any): AttributesConfig {
        this.jsx += `${this._renderedTabIndent}<${this._componentName}`;

        const attributesConfig: AttributesConfig = this.renderAttributes(data, schema);

        // if there are nested attributes this component will not have a self closing tag
        if (attributesConfig.hasNestedAttributes) {
            if (attributesConfig.hasInlineAttributes) {
                this.jsx += `${this._renderedTabIndent}>\n`;
            } else {
                this.jsx += `>\n`;
            }
        }

        return attributesConfig;
    }

    private renderAttributes(attributes: any, schema: any): AttributesConfig {
        let hasNestedAttributes: boolean = false;
        let hasInlineAttributes: boolean = false;
        const nestedAttributes: string[] = [];
        const attributeKeys: string[] = Object.keys(attributes);

        if (attributeKeys.length > 0) {
            attributeKeys.forEach((attributeName: string) => {
                const attributeConfig: AttributeConfig = this.renderAttribute(
                    attributeName,
                    attributes[attributeName],
                    get(
                        schema,
                        `${mapSchemaLocationFromDataLocation(
                            attributeName,
                            schema,
                            attributes
                        )}.${pluginIdKeyword}`
                    )
                );

                hasNestedAttributes =
                    attributeConfig.attributeType === AttributeType.nested ||
                    hasNestedAttributes;
                hasInlineAttributes =
                    attributeConfig.attributeType === AttributeType.inline ||
                    hasInlineAttributes;

                if (hasNestedAttributes) {
                    nestedAttributes.push(attributeName);
                }
            });

            if (this.inlineAttributes !== "") {
                this.jsx += `\n`;
                this.jsx += this.inlineAttributes;
            }
        }

        return {
            hasNestedAttributes,
            hasInlineAttributes,
            nestedAttributes,
        };
    }

    private renderAttribute(
        attributeName: string,
        attributeValue: any,
        pluginId: string
    ): AttributeConfig {
        const plugin: MapDataToCodePreview<MapDataToCodePreviewProps> = this.plugins.find(
            (pluginItem: MapDataToCodePreview<MapDataToCodePreviewProps>) => {
                return pluginItem.matches(pluginId);
            }
        );
        let render: AttributeRender;

        if (plugin !== undefined) {
            render = plugin.resolver(attributeValue, this._tabIndent + 1, attributeName);
        } else {
            render = defaultCodePreviewAttributeRender(
                attributeName === "children" && typeof attributeValue === "string"
                    ? `${this._renderedTabIndent}${standardTabIndent}${attributeValue}\n`
                    : attributeValue,
                attributeName
            );
        }

        switch (render.type) {
            case AttributeType.inline:
                this.inlineAttributes += `${standardTabIndent}${
                    this._renderedTabIndent
                }${attributeName}={${render.render}}\n`;

                return {
                    attributeType: AttributeType.inline,
                };
            case AttributeType.variable:
                this.variables.push(`const ${render.id} = ${render.render};\n\n`);

                this.inlineAttributes += `${standardTabIndent}${
                    this._renderedTabIndent
                }${attributeName}={${render.id}}\n`;

                return {
                    attributeType: AttributeType.inline,
                };
            case AttributeType.nested:
                this.nested[attributeName] = render.render;
        }

        return {
            attributeType: AttributeType.nested,
        };
    }

    private renderCloseTag(
        hasNestedAttributes: boolean,
        hasInlineAttributes: boolean
    ): void {
        if (!hasNestedAttributes && !hasInlineAttributes) {
            this.jsx += " />";
        } else if (!hasNestedAttributes) {
            this.jsx += `${this._renderedTabIndent}/>`;
        } else {
            this.jsx += `${this._renderedTabIndent}</${this._componentName}>`;
        }
    }

    private renderNested(attributes: string[], props: any): void {
        attributes.forEach((attribute: string) => {
            this.jsx += this.nested[attribute];
        });
    }

    /**
     * Gets a components code preview
     */
    private getComponentCodePreview(codePreviewConfig: ComponentCodePreviewConfig): void {
        const attributesConfig: AttributesConfig = this.renderOpenTag(
            codePreviewConfig.data,
            codePreviewConfig.schema
        );

        if (attributesConfig.hasNestedAttributes) {
            this.renderNested(attributesConfig.nestedAttributes, codePreviewConfig.data);
        }

        this.renderCloseTag(
            attributesConfig.hasNestedAttributes,
            attributesConfig.hasInlineAttributes
        );
    }
}

/**
 * Render function
 */
function defaultCodePreviewAttributeRender(value: any, key: string): AttributeRender {
    if (isObject(value)) {
        return {
            id: uniqueId(key),
            render:
                Array.isArray(value) || (typeof value === "object" && value !== null)
                    ? JSON.stringify(value, null, 2)
                    : value.toString(),
            type: AttributeType.variable,
        };
    }

    if (key === "children") {
        return {
            render: value,
            type: AttributeType.nested,
        };
    }

    return {
        render: typeof value === "string" ? `"${value}"` : value.toString(),
        type: AttributeType.inline,
    };
}
