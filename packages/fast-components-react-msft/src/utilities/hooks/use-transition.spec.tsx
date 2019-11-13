import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import { normalizeAnimationConfigValue } from "./use-transition";

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
