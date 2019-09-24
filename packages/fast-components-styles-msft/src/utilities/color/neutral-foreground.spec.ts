import {
    neutralForegroundActive,
    neutralForegroundHover,
    neutralForegroundRest,
} from "./neutral-foreground";
import designSystemDefaults from "../../design-system";
import { contrast } from "./common";

describe("neutralForeground", (): void => {
    const whiteContrast: ReturnType<typeof contrast> = contrast("#FFF");

    test("should return a string when invoked with an object", (): void => {
        expect(typeof neutralForegroundRest(designSystemDefaults)).toBe("string");
        expect(typeof neutralForegroundHover(designSystemDefaults)).toBe("string");
        expect(typeof neutralForegroundActive(designSystemDefaults)).toBe("string");
    });

    test("should return a function when invoked with a function", (): void => {
        expect(typeof neutralForegroundRest(() => "#FFF")).toBe("function");
        expect(typeof neutralForegroundHover(() => "#FFF")).toBe("function");
        expect(typeof neutralForegroundActive(() => "#FFF")).toBe("function");
    });

    test("should operate on default design system if no design system is supplied", (): void => {
        expect(
            whiteContrast(neutralForegroundRest(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundRest(() => undefined as any)(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundRest(() => "#FFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundRest(() => "#FFFFFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);

        expect(
            whiteContrast(neutralForegroundHover(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(
                neutralForegroundHover(() => undefined as any)(undefined as any)
            )
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundHover(() => "#FFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundHover(() => "#FFFFFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);

        expect(
            whiteContrast(neutralForegroundActive(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(
                neutralForegroundActive(() => undefined as any)(undefined as any)
            )
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundActive(() => "#FFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);
        expect(
            whiteContrast(neutralForegroundActive(() => "#FFFFFF")(undefined as any))
        ).toBeGreaterThanOrEqual(14);
    });

    test("should return correct result with default design system values", (): void => {
        expect(
            whiteContrast(neutralForegroundRest(designSystemDefaults))
        ).toBeGreaterThanOrEqual(14);
    });

    test("should return #FFFFFF with a dark background", (): void => {
        expect(
            contrast(
                neutralForegroundRest(
                    Object.assign({}, designSystemDefaults, {
                        backgroundColor: "#000",
                    })
                )
            )("#000")
        ).toBeGreaterThanOrEqual(14);
    });
});
