import { ComponentData, ComponentProperty } from "./component-data";
import { ReferenceTracker } from "./reference-tracker";

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
    const referenceTracker: ReferenceTracker = new ReferenceTracker();

    return {
        name: namedInterface.name,
        properties: namedInterface.children
            .filter(isPropertyType)
            .map(
                (value: any): ComponentProperty | null => {
                    return resolveProperty(value, referenceTracker);
                }
            )
            .filter((value: ComponentProperty | null) => !!value),
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

/**
 * Resolution functions - resolves various types
 */
function resolveProperty(
    property: any,
    referenceTracker: ReferenceTracker
): ComponentProperty | null {
    switch (property.type.type) {
        case Types.intrinsic:
            return {
                name: property.name,
                type: resolveType(property.type, referenceTracker),
                required: !property.flags.isOptional,
            };
        case Types.tuple: {
            return {
                name: property.name,
                type: resolveType(property.type, referenceTracker),
                required: !property.flags.isOptional,
            };
        }
    }

    console.log("returning null", property);
    return null;
}

function resolveType(value: any, referenceTracker: ReferenceTracker): any {
    switch (value.type) {
        case Types.intrinsic:
            return value.name;
        case Types.tuple:
            const elements: any[] = value.elements || [];
            return `[${elements
                .map((element: any): any => resolveType(element, referenceTracker))
                .join(", ")}]`;
    }
}

/**
 * Assertions
 */
function isPropertyType<T extends { kindString: string }>(value: T): boolean {
    return value.kindString === "Property";
}
