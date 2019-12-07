/**
 * Data structure to describe a component's API
 */
export interface ComponentData {
    /**
     * All of the properties of the API
     */
    properties: ComponentProperty[];

    /**
     * Type references
     */
    references?: { [key: number]: ComponentProperty[] };
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
     * If the type is a reference to another type with properties (JS object),
     * a reference to that type ID will exist here.
     */
    typeReference?: number[];
}
