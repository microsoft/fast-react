import { ComponentData } from "./component-data";

/**
 * Extracts documentation data for a UI component from TypeDoc JSON data.
 * @param name - the name of the interface or type alias to process
 * @param data - the TypeDoc JSON blob containing the interface and any dependent type data
 */
export default function extractor(name: string, data: any): ComponentData {
    // Exit if data is invalid
    if (typeof data !== "object" || data === null || data instanceof Date) {
        throw new Error(`Encountered invalid data. ${typeof data} is not not valid.`);
        return;
    }

    // Ensure a type by the input 'name' exists in the provided data
    if (
        !Array.isArray(data.children) ||
        !data.children.some((value: { name: string }): boolean => value.name === name)
    ) {
        throw new Error(`No type data found for name ${name}`);
    }

    return { properties: [] };
}
