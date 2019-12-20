import "jest";
import {
    getDataLocationsOfPlugins,
    mapSchemaLocationFromDataLocation,
    normalizeDataLocation,
    normalizeDataLocationToDotNotation,
} from "./location";
import { pluginIdKeyword, PluginLocation } from "./types";

import {
    alignHorizontalSchema,
    anyOfSchema,
    arraysSchema,
    childrenSchema,
    componentPluginSchema,
    oneOfDeeplyNestedSchema,
    oneOfSchema,
} from "../__tests__/schemas";
import { childrenSchema as reactChildrenSchema } from "@microsoft/fast-tooling";

const plainSchemaWithChildren: any = {
    type: "object",
    properties: {
        children: {
            ...reactChildrenSchema,
        },
    },
};

/**
 * Map schema location from data location
 */
describe("mapSchemaLocationFromDataLocation", () => {
    test("should return a schema location from a root data location", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "",
            alignHorizontalSchema,
            {}
        );

        expect(schemaLocation).toBe("");
    });
    test("should return a schema location from a nested property", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "alignHorizontal",
            alignHorizontalSchema,
            { alignHorizontal: "left" }
        );

        expect(schemaLocation).toBe("properties.alignHorizontal");
    });
    test("should return a schema location from an array", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "strings[0]",
            arraysSchema,
            { strings: ["a"] }
        );

        expect(schemaLocation).toBe("properties.strings.items");
    });
    test("should return a schema location from a nested array item", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "objects[1].string",
            arraysSchema,
            { objects: [{ string: "foo" }, { string: "bar" }] }
        );

        expect(schemaLocation).toBe("properties.objects.items.properties.string");
    });
    test("should return a schema location from anyOf locations", () => {
        const schemaLocationRoot: string = mapSchemaLocationFromDataLocation(
            "",
            anyOfSchema,
            { number: 5 }
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "number",
            anyOfSchema,
            { number: 5 }
        );

        expect(schemaLocationRoot).toBe("");
        expect(schemaLocation).toBe("anyOf[1].properties.number");
    });
    test("should return a schema location from oneOf locations", () => {
        const schemaLocationRoot: string = mapSchemaLocationFromDataLocation(
            "",
            oneOfSchema,
            { number: 5 }
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "number",
            oneOfSchema,
            { number: 5 }
        );

        expect(schemaLocationRoot).toBe("");
        expect(schemaLocation).toBe("oneOf[1].properties.number");
    });
    test("should return a schema location from a nested anyOf location", () => {
        const schemaLocationRootProperty: string = mapSchemaLocationFromDataLocation(
            "nestedAnyOf",
            anyOfSchema,
            { nestedAnyOf: { string: "foo" } }
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "nestedAnyOf.string",
            anyOfSchema,
            { nestedAnyOf: { string: "foo" } }
        );

        expect(schemaLocationRootProperty).toBe("anyOf[4].properties.nestedAnyOf");
        expect(schemaLocation).toBe(
            "anyOf[4].properties.nestedAnyOf.anyOf[1].properties.string"
        );
    });
    test("should return a schema location from a nested oneOf location", () => {
        const schemaLocationRootProperty: string = mapSchemaLocationFromDataLocation(
            "",
            oneOfSchema,
            { numberOrString: "foo" }
        );
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "numberOrString",
            oneOfSchema,
            { numberOrString: "foo" }
        );

        expect(schemaLocationRootProperty).toBe("");
        expect(schemaLocation).toBe("oneOf[2].properties.numberOrString");
    });
    test("should return a schema location from a non-object anyOf location", () => {
        const schemaLocationNumber: string = mapSchemaLocationFromDataLocation(
            "numberOrString",
            anyOfSchema,
            { numberOrString: 50 }
        );
        const schemaLocationString: string = mapSchemaLocationFromDataLocation(
            "numberOrString",
            anyOfSchema,
            { numberOrString: "foo" }
        );

        expect(schemaLocationNumber).toBe("anyOf[5].properties.numberOrString");
        expect(schemaLocationString).toBe("anyOf[5].properties.numberOrString");
    });
    test("should return a schema location from a non-object anyOf location in an array", () => {
        const schemaLocationArrayOfStrings: string = mapSchemaLocationFromDataLocation(
            "numberOrString.0",
            anyOfSchema,
            { numberOrString: ["Foo"] }
        );
        const schemaLocationArrayOfObjects: string = mapSchemaLocationFromDataLocation(
            "numberOrString[0].string",
            anyOfSchema,
            { numberOrString: [{ string: "Foo" }] }
        );
        const schemaLocationArrayOfNumbers: string = mapSchemaLocationFromDataLocation(
            "numberOrString[0]",
            anyOfSchema,
            { numberOrString: [1, 2, 3] }
        );

        expect(schemaLocationArrayOfStrings).toBe(
            "anyOf[5].properties.numberOrString.anyOf[2].items"
        );
        expect(schemaLocationArrayOfObjects).toBe(
            "anyOf[5].properties.numberOrString.anyOf[3].items.anyOf[0].properties.string"
        );
        expect(schemaLocationArrayOfNumbers).toBe(
            "anyOf[5].properties.numberOrString.anyOf[3].items"
        );
    });
    test("should return a schema location from a non-object oneOf location in an array", () => {
        const schemaLocationArrayOfStrings: string = mapSchemaLocationFromDataLocation(
            "numberOrString.0",
            oneOfSchema,
            { numberOrString: ["Foo"] }
        );
        const schemaLocationArrayOfNumbers: string = mapSchemaLocationFromDataLocation(
            "numberOrString[0]",
            oneOfSchema,
            { numberOrString: [1, 2, 3] }
        );

        expect(schemaLocationArrayOfStrings).toBe(
            "oneOf[2].properties.numberOrString.oneOf[3].items"
        );
        expect(schemaLocationArrayOfNumbers).toBe(
            "oneOf[2].properties.numberOrString.oneOf[3].items"
        );
    });
    test("should return a schema location from a deeply nested oneOf location", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "propertyKey.propertyKey1.propertyKey2.foo",
            oneOfDeeplyNestedSchema,
            {
                propertyKey: {
                    propertyKey1: {
                        propertyKey2: {
                            foo: "b",
                        },
                    },
                },
            }
        );

        expect(schemaLocation).toBe(
            "properties.propertyKey.oneOf[0].properties.propertyKey1.properties.propertyKey2.oneOf[1].properties.foo"
        );
    });
    test("should return a schema location from a child location when the child is a component", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "children",
            plainSchemaWithChildren,
            { children: { id: childrenSchema.id, props: {} } }
        );

        expect(schemaLocation).toBe("properties.children");
    });
    test("should return a schema location from a child location when the child is a string", () => {
        const schemaLocationString: string = mapSchemaLocationFromDataLocation(
            "children",
            plainSchemaWithChildren,
            { children: "Hello world" }
        );

        expect(schemaLocationString).toBe("properties.children");
    });
    test("should return a schema location from multiple children locations", () => {
        const schemaLocationComponent: string = mapSchemaLocationFromDataLocation(
            "children[0]",
            plainSchemaWithChildren,
            { children: [{ id: childrenSchema.id, props: {} }, "Hello world"] }
        );
        const schemaLocationString: string = mapSchemaLocationFromDataLocation(
            "children[1]",
            plainSchemaWithChildren,
            { children: [{ id: childrenSchema.id, props: {} }, "Hello world"] }
        );

        expect(schemaLocationComponent).toBe("properties.children.oneOf[4].items");
        expect(schemaLocationString).toBe("properties.children.oneOf[4].items");
    });
    test("should return a schema location from children in a nested array item", () => {
        const schema: any = {
            type: "object",
            properties: {
                render: {
                    type: "array",
                    items: plainSchemaWithChildren,
                },
            },
        };
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "render[0].children[0]",
            schema,
            {
                render: [
                    {
                        children: [
                            {
                                id: "textField",
                                props: {},
                            },
                            {
                                id: "children",
                                props: {},
                            },
                        ],
                    },
                ],
            }
        );
        expect(schemaLocation).toBe(
            "properties.render.items.properties.children.oneOf[4].items"
        );
    });
    test("should return a schema location early if a malformed segment has been discovered", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "propertyKey.foo.bar",
            oneOfDeeplyNestedSchema,
            {
                propertyKey: {
                    propertyKey1: {
                        propertyKey2: {
                            foo: "b",
                        },
                    },
                },
            }
        );

        expect(schemaLocation).toBe("properties.propertyKey.oneOf[0].foo");
    });
    test("should return a schema location early if no schema has been passed", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "propertyKey.foo.bar",
            void 0,
            {
                propertyKey: {
                    propertyKey1: {
                        propertyKey2: {
                            foo: "b",
                        },
                    },
                },
            }
        );

        expect(schemaLocation).toBe("");
    });
    test("should return a schema location with additional properties", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "a",
            {
                type: "object",
                additionalProperties: {
                    type: "string",
                },
            },
            {
                a: "foo",
            }
        );

        expect(schemaLocation).toBe("additionalProperties");
    });
    test("should return a schema location with additional properties from a nested location", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "foo.a",
            {
                type: "object",
                properties: {
                    foo: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
            },
            {
                foo: {
                    a: "bar",
                },
            }
        );

        expect(schemaLocation).toBe("properties.foo.additionalProperties");
    });
    test("should return a schema location with additional properties when other properties have been specified", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "a",
            {
                type: "object",
                properties: {
                    b: {
                        type: "string",
                    },
                },
                additionalProperties: {
                    type: "string",
                },
            },
            {
                a: "foo",
            }
        );

        expect(schemaLocation).toBe("additionalProperties");
    });
    test("should return a schema location with additional properties when the data location is enumerated in the properties", () => {
        const schemaLocation: string = mapSchemaLocationFromDataLocation(
            "a",
            {
                type: "object",
                properties: {
                    a: {
                        type: "string",
                    },
                },
                additionalProperties: {
                    type: "string",
                },
            },
            {
                a: "foo",
            }
        );

        expect(schemaLocation).toBe("properties.a");
    });
});

describe("getDataLocationsOfPlugins", () => {
    test("should return the data location at the root", () => {
        const data: string = "";

        const dataLocationsOfPlugins: PluginLocation[] = getDataLocationsOfPlugins(
            componentPluginSchema,
            data
        );

        expect(dataLocationsOfPlugins.length).toBe(1);
        expect(dataLocationsOfPlugins[0].dataLocation).toBe("");
    });

    test("should return the data location of a single plugin", () => {
        const data: any = {
            children: {
                id: childrenSchema.id,
                props: {},
            },
        };

        const dataLocationsOfPlugins: PluginLocation[] = getDataLocationsOfPlugins(
            plainSchemaWithChildren,
            data
        );

        expect(dataLocationsOfPlugins.length).toBe(1);
        expect(dataLocationsOfPlugins[0].dataLocation).toBe("children");
    });
    test("should return the data location of multiple plugins", () => {
        const data: any = {
            foo: {
                id: childrenSchema.id,
                props: {},
            },
            bar: {
                id: childrenSchema.id,
                props: {},
            },
        };

        const dataLocationsOfPlugins: PluginLocation[] = getDataLocationsOfPlugins(
            {
                type: "object",
                properties: {
                    foo: {
                        [pluginIdKeyword]: "foo",
                    },
                    bar: {
                        [pluginIdKeyword]: "bar",
                    },
                },
            },
            data
        );

        expect(dataLocationsOfPlugins.length).toBe(2);
        expect(dataLocationsOfPlugins[0].dataLocation).toBe("foo");
        expect(dataLocationsOfPlugins[1].dataLocation).toBe("bar");
    });
    test("should return the data location of nested plugins", () => {
        const data: any = {
            foo: {
                bar: {
                    id: childrenSchema.id,
                    props: {},
                },
            },
        };

        const dataLocationsOfPlugins: PluginLocation[] = getDataLocationsOfPlugins(
            {
                type: "object",
                properties: {
                    foo: {
                        [pluginIdKeyword]: "foo",
                        type: "object",
                        properties: {
                            bar: {
                                [pluginIdKeyword]: "bar",
                            },
                        },
                    },
                },
            },
            data
        );

        expect(dataLocationsOfPlugins.length).toBe(2);
        expect(dataLocationsOfPlugins[0].dataLocation).toBe("foo");
        expect(dataLocationsOfPlugins[1].dataLocation).toBe("foo.bar");
    });
});

describe("normalizeDataLocation", () => {
    describe("when the data is undefined", () => {
        test("should convert a dot location to a bracket location if the schema type is an array", () => {
            expect(normalizeDataLocation("0", void 0, { type: "array" })).toEqual("[0]");
        });
        test("should not convert a dot location to a bracket location if the schema type is not an array", () => {
            expect(normalizeDataLocation("0", void 0, { type: "object" })).toEqual("0");
        });
        test("should convert a dot location to a bracket location if the schema type is children", () => {
            expect(normalizeDataLocation("0", void 0, { type: "children" })).toEqual(
                "[0]"
            );
        });
        test("should convert a dot location to a bracket location if the array is a property on an object", () => {
            expect(
                normalizeDataLocation("bar.0", void 0, {
                    type: "object",
                    properties: { bar: { type: "array" } },
                })
            ).toEqual("bar[0]");
        });
        test("should convert a dot location to a bracket location that is nested in properties", () => {
            expect(
                normalizeDataLocation("foo.0.bar", void 0, {
                    type: "object",
                    properties: {
                        foo: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    bar: {},
                                },
                            },
                        },
                    },
                })
            ).toEqual("foo[0].bar");
            expect(normalizeDataLocation("0.foo.bar", void 0, { type: "array" })).toEqual(
                "[0].foo.bar"
            );
        });
    });
});

describe("normalizeDataLocationToDotLocation", () => {
    test("should convert a bracket location to a dot location", () => {
        expect(normalizeDataLocationToDotNotation("[0]")).toEqual("0");
    });
    test("should convert a bracket location to a dot location if the array is a property on an object", () => {
        expect(normalizeDataLocationToDotNotation("foo[0]")).toEqual("foo.0");
    });
    test("should convert a bracket location that is nested in properties to a dot location", () => {
        expect(normalizeDataLocationToDotNotation("foo[0].bar")).toEqual("foo.0.bar");
        expect(normalizeDataLocationToDotNotation("[0].foo.bar")).toEqual("0.foo.bar");
    });
    test("should not perform conversions on locations that are already dot locations", () => {
        expect(normalizeDataLocationToDotNotation("0")).toEqual("0");
        expect(normalizeDataLocationToDotNotation("foo.0")).toEqual("foo.0");
        expect(normalizeDataLocationToDotNotation("foo.0.bar")).toEqual("foo.0.bar");
        expect(normalizeDataLocationToDotNotation("0.foo.bar")).toEqual("0.foo.bar");
    });
});
