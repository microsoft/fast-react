import { ComponentData, ComponentProperty, TypeInterface } from "./component-data";

export class Extractor {
    /**
     * The type data exported from TypeDoc
     */
    private data: any;

    private references: TypeInterface[];

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

        if (namedInterface.kindString !== KindStrings.interface) {
            throw new Error(
                `The component API extractor currently only supports interface types - ensure the type being selected is an interface`
            );
        }

        // Clear all references
        this.references = [];

        const foo: ComponentData = {
            name: namedInterface.name,
            properties: this.resolveInterface(namedInterface),
            references: this.references.concat(),
        };

        return foo;
    }

    private resolveProperty(property: any): ComponentProperty | null {
        switch (property.type.type) {
            case Types.intrinsic:
            case Types.tuple:
            case Types.array:
            case Types.reference:
                return {
                    name: property.name,
                    type: this.resolveType(property.type),
                    required: !property.flags.isOptional,
                };
        }

        return null;
    }

    /**
     * Resolves an object representing a `type`
     */
    private resolveType(value: any): string {
        switch (value.type) {
            case Types.intrinsic:
                return this.formatIntrinsicType(value);
            case Types.tuple:
                return this.formatTupleType(value);
            case Types.reference:
                return this.formatReferenceType(value);
            case Types.array:
                return this.formatArrayType(value);
            case Types.union:
                return this.formatUnionType(value);
            case Types.intersection:
                return this.formatIntersectionType(value);
        }

        return "";
    }

    private resolveInterface(value: any): ComponentProperty[] {
        return value.children
            .filter(isPropertyType)
            .map(
                (property: any): ComponentProperty | null => {
                    return this.resolveProperty(property);
                }
            )
            .filter((property: ComponentProperty | null) => !!property);
    }

    /**
     * Finds a type reference by id and adds the resolved type to the
     * references property
     */
    private resolveReference(id: number): void {
        // Don't resolve references multiple times
        // TODO not all references have IDs - Array's of unions do not
        if (this.references.some((ref: any): boolean => ref.id === id)) {
            return;
        }

        const reference: any = this.getReferenceById(id);

        switch (reference.kindString) {
            case KindStrings.interface:
                this.references = this.references.concat({
                    id,
                    name: reference.name,
                    properties: this.resolveInterface(reference),
                });
                break;
        }
    }

    private getReferenceById(id: number): any {
        const reference: any | undefined = this.data.children.find(
            (type: any) => type.id === id
        );

        if (reference === undefined) {
            throw new Error(`Type reference with id ${id} was not found`);
        }

        return reference;
    }

    /**
     * Formatters for converting a type to a documentation string
     */
    private formatIntrinsicType(type: IntrinsicType): string {
        return type.name;
    }

    private formatTupleType(type: TupleType): string {
        return !Array.isArray(type.elements)
            ? "[]"
            : `[${type.elements
                  .map((element: any): any => this.resolveType(element))
                  .join(", ")}]`;
    }

    private formatArrayType(type: ArrayType): string {
        return `Array<${this.resolveType(type.elementType)}>`;
    }

    private formatUnionType(type: UnionType): string {
        return type.types
            .map((unionValue: any) => this.resolveType(unionValue))
            .join(" | ");
    }

    private formatIntersectionType(type: IntersectionType): string {
        return type.types
            .map((intersectionType: any) => this.resolveType(intersectionType))
            .join(" & ");
    }

    private formatReferenceType(type: ReferenceType | ArrayReferenceType): string {
        if (typeof type.id === "number") {
            this.resolveReference(type.id);
        }

        if (type.name === ReferenceNames.array) {
            return this.formatArrayReferenceType(type as ArrayReferenceType);
        } else {
            return type.name;
        }
    }

    private formatArrayReferenceType(type: ArrayReferenceType): string {
        return this.formatArrayType({
            type: Types.array,
            elementType: type.typeArguments[0], // Arrays only have a single type argument, so we can safely grab the first one
        });
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
    array = "array",
    union = "union",
    intersection = "intersection",
}

enum KindStrings {
    property = "Property",
    interface = "Interface",
    typeLiteral = "Type literal",
    callSignature = "Call signature",
}

enum ReferenceNames {
    array = "Array",
}

/**
 * The JSON structure for intrinsic types
 */
interface IntrinsicType {
    type: Types.intrinsic;
    name: IntrinsicTypes;
}

interface TupleType {
    type: Types.tuple;
    elements: Array<IntrinsicType | any>;
}

interface ArrayType {
    type: Types.array;
    elementType: any;
}

interface UnionType {
    type: Types.union;
    types: any[];
}

interface IntersectionType {
    type: Types.intersection;
    types: any[];
}

interface ReferenceType {
    type: Types.reference;
    name: string;
    id?: number;
}

interface ArrayReferenceType extends ReferenceType {
    name: ReferenceNames.array;
    typeArguments: any[];
}

/**
 * Assertions
 */
function isPropertyType<T extends { kindString: string }>(value: T): boolean {
    return value.kindString === KindStrings.property;
}
