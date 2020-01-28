import {
    isComponentNode,
    isFrameNode,
    isInstanceNode,
    isPolygonNode,
    isRectangleNode,
    isStarNode,
    isTextNode,
} from "./utilities/node";
import { ColorRecipeType } from "./color-recipies";

/**
 * Describes the data stored by the plugin with https://www.figma.com/plugin-docs/api/properties/nodes-setplugindata/
 */
export type PluginData = Record<ColorRecipeType, string> & { luminance: number };

/**
 * Light wrapper around the Figma getPluginData and setPluginData API to provide type safety
 */
export function getPluginData(
    node: PluginDataNode,
    key: "luminance"
): PluginData["luminance"];
export function getPluginData(
    node: PluginDataNode,
    key: Exclude<keyof PluginData, "luminance">
): PluginData[Exclude<keyof PluginData, "luminance">];
export function getPluginData(
    node: PluginDataNode,
    key: keyof PluginData
): PluginData[keyof PluginData] {
    const raw = node.getPluginData(key);
    if (key === "luminance") {
        const lumValue = parseFloat(raw);
        return Number.isNaN(lumValue) ? -1 : lumValue;
    } else {
        return raw;
    }
}

export function setPluginData(
    node: PluginDataNode,
    key: "luminance",
    value: PluginData["luminance"]
): void;
export function setPluginData(
    node: PluginDataNode,
    key: Exclude<keyof PluginData, "luminance">,
    value: PluginData[Exclude<keyof PluginData, "luminance">]
): void;
export function setPluginData(
    node: PluginDataNode,
    key: keyof PluginData,
    value: PluginData[keyof PluginData]
): void {
    node.setPluginData(key, typeof value === "number" ? value.toString(10) : value);
}

export type FillRecipeNode = FrameNode | RectangleNode | PolygonNode | StarNode;
export type LuminanceNode = FillRecipeNode;
export type PluginDataNode = FillRecipeNode | StrokeRecipeNode | TextFillRecipeNode;
export type StrokeRecipeNode = FillRecipeNode;
export type TextFillRecipeNode = TextNode;

/**
 * Test if a node supports a type of data
 */
export function supports(node: BaseNode, type: "backgroundFill"): node is FillRecipeNode;
export function supports(node: BaseNode, type: "strokeFill"): node is StrokeRecipeNode;
export function supports(node: BaseNode, type: "textFill"): node is TextFillRecipeNode;
export function supports(node: BaseNode, type: "luminance"): node is LuminanceNode;
export function supports(node: BaseNode, type: keyof PluginData): boolean {
    return type === "backgroundFill" || type === "strokeFill" || type === "luminance"
        ? [
              isComponentNode,
              isFrameNode,
              isInstanceNode,
              isRectangleNode,
              isPolygonNode,
              isStarNode,
          ].some((test: (node: BaseNode) => boolean) => test(node))
        : isTextNode(node);
}

export function supportsPluginData(node: BaseNode): node is PluginDataNode {
    return (
        supports(node, "backgroundFill") ||
        supports(node, "strokeFill") ||
        supports(node, "textFill")
    );
}
