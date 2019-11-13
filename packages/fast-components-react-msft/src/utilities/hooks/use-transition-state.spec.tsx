import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import {
    TransitionStates,
    useTransitionState,
    getTransitionState,
} from "./use-transition-state";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

/**
 * Mock timers
 */
jest.useFakeTimers();

function UseTransitionState(props: {
    value: boolean;
    duration: number | { activating: number; deactivating: number };
}): JSX.Element {
    return <div>{useTransitionState(props.value, props.duration)}</div>;
}

describe("useTransitionState", (): void => {
    test("should return 'inactive' state when initialized with a falsey value", (): void => {
        const rendered: ReactWrapper = mount(
            <UseTransitionState duration={300} value={false} />
        );

        expect(rendered.find("div").text()).toBe(TransitionStates.inactive.toString());
    });

    test("should return 'active' state when initialized with a falsey value", (): void => {
        const rendered: ReactWrapper = mount(
            <UseTransitionState duration={300} value={true} />
        );

        expect(rendered.find("div").text()).toBe(TransitionStates.active.toString());
    });

    test("should return an 'enter' state when initialized with a truthy value", (): void => {
        const rendered: ReactWrapper = mount(
            <UseTransitionState duration={300} value={false} />
        );

        expect(rendered.find("div").text()).toBe(TransitionStates.inactive.toString());
        jest.runAllTimers();

        rendered.setProps({ value: true });
        expect(rendered.find("div").text()).toBe(TransitionStates.activating.toString());

        jest.runAllTimers();
        expect(rendered.find("div").text()).toBe(TransitionStates.active.toString());
    });

    test("should move from a 'from' state to a 'enter' state when value goes from false -> true", (): void => {
        const rendered: ReactWrapper = mount(
            <UseTransitionState duration={300} value={false} />
        );

        jest.runAllTimers();
        expect(rendered.find("div").text()).toBe(TransitionStates.inactive.toString());

        rendered.setProps({ value: true });
        expect(rendered.find("div").text()).toBe(TransitionStates.activating.toString());
        jest.runAllTimers();
        expect(rendered.find("div").text()).toBe(TransitionStates.active.toString());
    });

    test("should move from a 'enter' state to a 'leave' state when value goes from true -> false", (): void => {
        const rendered: ReactWrapper = mount(
            <UseTransitionState duration={300} value={true} />
        );

        jest.runAllTimers();
        expect(rendered.find("div").text()).toBe(TransitionStates.active.toString());

        rendered.setProps({ value: false });

        expect(rendered.find("div").text()).toBe(
            TransitionStates.deactivating.toString()
        );
        jest.runAllTimers();
        expect(rendered.find("div").text()).toBe(TransitionStates.inactive.toString());
    });
});

describe("getTransitionState", (): void => {
    test("should return inactive if both current and previous values are false", (): void => {
        expect(getTransitionState(false, false)).toBe(TransitionStates.inactive);
    });
    test("should return active if both current and previous values are true", (): void => {
        expect(getTransitionState(true, true)).toBe(TransitionStates.active);
    });
    test("should return activating if the previous value is false and current value is true", (): void => {
        expect(getTransitionState(false, true)).toBe(TransitionStates.activating);
    });
    test("should return deactiving if the previous value is true and current value is false", (): void => {
        expect(getTransitionState(true, false)).toBe(TransitionStates.deactivating);
    });
});
