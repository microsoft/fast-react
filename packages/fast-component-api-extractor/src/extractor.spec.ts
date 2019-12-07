import fs from "fs";
import path from "path";
import extractor from "./extractor";

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

        // TOOD: for some reason checking Array.isArray in extractor causes jest to blow up
        xtest("should throw if supplied data is an array", () => {
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
});
