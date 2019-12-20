import {
    MapDataToCodePreview,
    MapDataToCodePreviewProps,
} from "./mapping.data-to-code-preview.plugin";

export interface CodePreviewChildOption {
    /**
     * The JSX tag name of the component
     */
    name: string;

    /**
     * The JSON schema of the component
     */
    schema: any;
}

export interface MapCodePreviewConfig {
    /**
     * The data for the code preview
     */
    data: any;

    /**
     * The JSON schema of the component
     */
    schema: any;

    /**
     * The component name
     */
    componentName: string;

    /**
     * The plugins
     */
    plugins?: Array<MapDataToCodePreview<MapDataToCodePreviewProps>>;

    /**
     * The tab indent
     * @default 0
     */
    tabIndent?: number;
}

export interface CodePreviewConfig {
    /**
     * The data for the code preview
     */
    data: any;
}

export interface ComponentCodePreviewConfig extends CodePreviewConfig {
    /**
     * The current tab indenting in spaces
     */
    tabIndent: string;

    /**
     * The component name
     */
    componentName: string;

    /**
     * The type of render for this information
     */
    renderType: CodePreviewRenderType;

    /**
     * The JSON schema for the data
     */
    schema: any;
}

export enum CodePreviewRenderType {
    attributes,
    openTag,
    closeTag,
}

export interface AttributesConfig {
    hasInlineAttributes: boolean;
    hasNestedAttributes: boolean;
    nestedAttributes: string[];
}

export interface AttributeConfig {
    attributeType: AttributeType;
}

export const standardTabIndent: string = "    ";

export enum AttributeType {
    nested,
    inline,
    variable,
}

export interface AttributeRender {
    id?: string;
    render: string;
    type: AttributeType;
}
