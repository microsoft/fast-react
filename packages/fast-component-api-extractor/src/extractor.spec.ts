import fs from "fs";
import path from "path";
import extractor from "./extractor";
import { ComponentData, ComponentProperty } from "./component-data";

let fixtures: any;
const dataPath: string = path.resolve(__dirname, "../.tmp/fixtures.json");

try {
    fixtures = JSON.parse(fs.readFileSync(dataPath).toString());
} catch (e) {
    throw new Error(
        `Error loading fixture data from ${dataPath}\nEnsure fixture data exists by running 'npm run build:fixtures'`
    );
}

describe("extractor", () => {
    describe("error cases", () => {
        test("should throw if supplied data is null", () => {
            expect(() => {
                extractor("foo", null);
            }).toThrow();
        });
        test("should throw if supplied data is undefined", () => {
            expect(() => {
                extractor("foo", undefined);
            }).toThrow();
        });
        test("should throw if supplied data is a string", () => {
            expect(() => {
                extractor("foo", "bar" as any);
            }).toThrow();
        });
        test("should throw if supplied data is a number", () => {
            expect(() => {
                extractor("foo", 0 as any);
            }).toThrow();
        });
        test("should throw if supplied data is a Date", () => {
            expect(() => {
                extractor("foo", new Date() as any);
            }).toThrow();
        });
        test("should throw if supplied data is a NaN", () => {
            expect(() => {
                extractor("foo", NaN as any);
            }).toThrow();
        });
        test("should throw if supplied data is a Infinity", () => {
            expect(() => {
                extractor("foo", Infinity as any);
            }).toThrow();
        });
        test("should throw if supplied data is an array", () => {
            expect(() => {
                extractor("foo", []);
            }).toThrow();
        });
        test("should throw if there is no children data", () => {
            expect(() => {
                extractor("foo", {});
            }).toThrow();
        });
        test("should throw if there is no children data by the name provided", () => {
            expect(() => {
                extractor("foo", { children: [{ name: "bar" }] });
            }).toThrow();
        });
    });

    describe("intrinsics", () => {
        const intrinsics: ComponentData = extractor("IntrinsicsFixture", fixtures);

        test("should process a root level 'any' property", () => {
            const anyProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "any"
            );

            expect(anyProperty).not.toBeUndefined();
            expect(anyProperty.name).toBe("any");
            expect(anyProperty.required).toBe(true);
            expect(anyProperty.type).toBe("any");
        });
        test("should process a root level 'boolean' property", () => {
            const booleanProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "boolean"
            );

            expect(booleanProperty).not.toBeUndefined();
            expect(booleanProperty.name).toBe("boolean");
            expect(booleanProperty.required).toBe(true);
            expect(booleanProperty.type).toBe("boolean");
        });
        test("should process a root level 'number' property", () => {
            const numberProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "number"
            );

            expect(numberProperty).not.toBeUndefined();
            expect(numberProperty.name).toBe("number");
            expect(numberProperty.required).toBe(true);
            expect(numberProperty.type).toBe("number");
        });
        test("should process a root level 'object' property", () => {
            const objectProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "object"
            );

            expect(objectProperty).not.toBeUndefined();
            expect(objectProperty.name).toBe("object");
            expect(objectProperty.required).toBe(true);
            expect(objectProperty.type).toBe("object");
        });
        test("should process a root level 'string' property", () => {
            const stringProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "string"
            );

            expect(stringProperty).not.toBeUndefined();
            expect(stringProperty.name).toBe("string");
            expect(stringProperty.required).toBe(true);
            expect(stringProperty.type).toBe("string");
        });
        test("should process a root level 'unknown' property", () => {
            const unknownProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "unknown"
            );

            expect(unknownProperty).not.toBeUndefined();
            expect(unknownProperty.name).toBe("unknown");
            expect(unknownProperty.required).toBe(true);
            expect(unknownProperty.type).toBe("unknown");
        });
        test("should process a root level 'tuple' property", () => {
            const tupleProperty: ComponentProperty = intrinsics.properties.find(
                (property: ComponentProperty): boolean => property.name === "tuple"
            );

            expect(tupleProperty).not.toBeUndefined();
            expect(tupleProperty.name).toBe("tuple");
            expect(tupleProperty.required).toBe(true);
            expect(tupleProperty.type).toBe("tuple");
        });
    });
});
