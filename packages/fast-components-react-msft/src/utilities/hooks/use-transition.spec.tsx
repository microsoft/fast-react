import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import { formatKeyframes, normalizeAnimationConfigValue } from "./use-transition";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

/**
 * Mock timers
 */
jest.useFakeTimers();

describe("normalizeAnimationConfigValue", (): void => {
    test("should convert a single value to a two index array with each value equal to the input", (): void => {
        expect(normalizeAnimationConfigValue("foo")).toEqual(["foo", "foo"]);
        expect(normalizeAnimationConfigValue(0)).toEqual([0, 0]);
    });
    test("should return the input when it is an array", (): void => {
        expect(normalizeAnimationConfigValue(["foo", "bar"])).toEqual(["foo", "bar"]);
        expect(normalizeAnimationConfigValue([0, 10])).toEqual([0, 10]);
    });
});

describe("formatKeyframes", (): void => {
    const inactive: React.CSSProperties = {
        color: "red",
    };
    const active: React.CSSProperties = {
        margin: "2px",
    };
    const deactivating: React.CSSProperties = {
        fontSize: "10pt",
    };

    test("should return an array of two CSS property objects with 'from' and 'to' properties", (): void => {
        expect(formatKeyframes(inactive, active)[0].from).not.toBeUndefined();
        expect(formatKeyframes(inactive, active)[0].to).not.toBeUndefined();
        expect(formatKeyframes(inactive, active)[1].from).not.toBeUndefined();
        expect(formatKeyframes(inactive, active)[1].to).not.toBeUndefined();
    });
    test("should apply the first argument to the 'from' property of the first index, and the 'to' property of the second index when provided two arguments", (): void => {
        expect(formatKeyframes(inactive, active)[0].from).toEqual(inactive);
        expect(formatKeyframes(inactive, active)[1].to).toEqual(inactive);
    });
    test("should apply the second argument to the 'to' property of the first index, and the 'from' property of the second index when provided two arguments", (): void => {
        expect(formatKeyframes(inactive, active)[1].from).toEqual(active);
        expect(formatKeyframes(inactive, active)[0].to).toEqual(active);
    });
    test("should construct the first keyframe with the first two arguments and the second keyframe with the second two arguments when provided three arguments", (): void => {
        expect(formatKeyframes(inactive, active, deactivating)[0].from).toEqual(inactive);
        expect(formatKeyframes(inactive, active, deactivating)[0].to).toEqual(active);
        expect(formatKeyframes(inactive, active, deactivating)[1].from).toEqual(active);
        expect(formatKeyframes(inactive, active, deactivating)[1].to).toEqual(
            deactivating
        );
    });
});
