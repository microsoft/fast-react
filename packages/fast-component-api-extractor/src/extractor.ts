import { ComponentData, ComponentProperty } from "./component-data";
import { ReferenceTracker } from "./reference-tracker";

export class Extractor {
    /**
     * The type data exported from TypeDoc
     */
    private data: any;

    private references: any[];

    constructor(data: any) {
        // Exit if data is invalid
        if (
            typeof data !== "object" ||
            data === null ||
            data instanceof Date ||
            !Array.isArray(data.children) ||
            Array.isArray(data)
        ) {
            throw new Error(`Encountered invalid data. ${typeof data} is not not valid.`);
        }

        this.data = data;
    }

    public extractByName(name: string): ComponentData {
        const namedInterface: any | undefined = this.data.children.find(
            (value: any) => value.name === name
        );

        // Ensure a type by the input 'name' exists in the provided data
        if (namedInterface === undefined) {
            throw new Error(`No type data found for name ${name}`);
        }

        // Clear all references
        this.references = [];

        return {
            name: namedInterface.name,
            properties: namedInterface.children
                .filter(isPropertyType)
                .map(
                    (value: any): ComponentProperty | null => {
                        return this.resolveProperty(value);
                    }
                )
                .filter((value: ComponentProperty | null) => !!value),
        };
    }

    private resolveProperty(property: any): ComponentProperty | null {
        switch (property.type.type) {
            case Types.intrinsic:
                return {
                    name: property.name,
                    type: this.resolveType(property.type),
                    required: !property.flags.isOptional,
                };
            case Types.tuple: {
                return {
                    name: property.name,
                    type: this.resolveType(property.type),
                    required: !property.flags.isOptional,
                };
            }
        }

        return null;
    }

    private resolveType(value: any): string {
        switch (value.type) {
            case Types.intrinsic:
                return value.name;
            case Types.tuple:
                const elements: any[] = value.elements || [];
                return `[${elements
                    .map((element: any): any => this.resolveType(element))
                    .join(", ")}]`;
            case Types.reference:
                return value.name;
        }

        return "";
    }
}

/**
 * Extracts documentation data for a UI component from TypeDoc JSON data.
 * @param name - the name of the interface or type alias to process
 * @param data - the TypeDoc JSON blob containing the interface and any dependent type data
 */
export default function extractor(name: string, data: any): ComponentData {
    const extract: Extractor = new Extractor(data);
    return extract.extractByName(name);
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
    reference = "reference",
}

/**
 * The JSON structure for intrinsic types
 */
interface IntrinsicType {
    type: "intrinsic";
    name: IntrinsicTypes;
}

/**
 * Assertions
 */
function isPropertyType<T extends { kindString: string }>(value: T): boolean {
    return value.kindString === "Property";
}
