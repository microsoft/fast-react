import { duration } from "./motion";
import designSystemDefaults, { DesignSystem } from "../design-system";
import { multiply } from "@microsoft/fast-jss-utilities";

const none: DesignSystem = {...designSystemDefaults, ...{ relativeMotion: 0 }}
const full: DesignSystem = {...designSystemDefaults, ...{ relativeMotion: 1 }}


describe("motion", () => {
    test("should return 0 when design-system's relativeMotion is 0", () => {
        expect(duration(none)).toBe(0);
    });

    test("should return 500 when the design-system's relativeMotion is 1", () => {
        expect(duration(full)).toBe(500)
    });
    describe("adding numbers", () => {
        test("should add a number when relativeMotion is not 0", () => {
            expect(duration(200)(full)).toBe(700)
        });
        test("should not add a number when relativeMotion is 0", () => {
            expect(duration(200)(none)).toBe(0);
        });
        test("should add the result of a function when relativeMotion is not 0", () => {
            expect(duration((d: DesignSystem) => 400)(full)).toBe(900)
        });
    });
});
