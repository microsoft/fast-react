/**
 * Data structure to describe a component's API
 */
export interface ComponentData {
    /**
     * The name of the type being documented
     */
    name: string;

    /**
     * All of the properties of the API
     */
    properties: ComponentProperty[];

    /**
     * Type references
     */
    references?: TypeInterface[];
}

export interface ComponentProperty {
    /**
     * The name of the property
     */
    name: string;

    /**
     * The type of the property
     */
    type: string;

    /**
     * If the property is required
     */
    required: boolean;

    /**
     * If the type is a reference to another type with properties (JS object),
     * a reference to that type ID will exist here.
     */
    typeReference?: number[];
}

export interface TypeInterface {
    id: number;
    name: string;
    properties: ComponentProperty[];
}
