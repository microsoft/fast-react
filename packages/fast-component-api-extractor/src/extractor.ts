import { ComponentData, ComponentProperty } from "./component-data";

/**
 * Extracts documentation data for a UI component from TypeDoc JSON data.
 * @param name - the name of the interface or type alias to process
 * @param data - the TypeDoc JSON blob containing the interface and any dependent type data
 */
export default function extractor(name: string, data: any): ComponentData {
    // Exit if data is invalid
    if (
        typeof data !== "object" ||
        data === null ||
        data instanceof Date ||
        Array.isArray(data)
    ) {
        throw new Error(`Encountered invalid data. ${typeof data} is not not valid.`);
    }

    // Ensure a type by the input 'name' exists in the provided data
    if (
        !Array.isArray(data.children) ||
        !data.children.some((value: { name: string }): boolean => value.name === name)
    ) {
        throw new Error(`No type data found for name ${name}`);
    }

    const namedInterface: any = data.children.find((value: any) => value.name === name);

    return {
        name: namedInterface.name,
        properties: namedInterface.children.map(resolveProperty),
    };
}

enum IntrinsicTypes {
    any = "any",
    boolean = "boolean",
    number = "number",
    object = "object",
    string = "string",
    unknown = "unknown",
}

enum Types {
    intrinsic = "intrinsic",
    tuple = "tuple",
}

/**
 * The JSON structure for intrinsic types
 */
interface IntrinsicType {
    type: "intrinsic";
    name: IntrinsicTypes;
}

function resolveProperty(property: any): ComponentProperty | null {
    switch (property.type.type) {
        case Types.intrinsic:
            return {
                name: property.name,
                type: property.type.name,
                required: !property.flags.isOptional,
            };
        case Types.tuple: {
            return {
                name: property.name,
                type: property.type.type,
                required: !property.flags.isOptional,
                // TODO: needs elements of tuple
            };
        }
    }

    console.log("returning null", property);
    return null;
}
