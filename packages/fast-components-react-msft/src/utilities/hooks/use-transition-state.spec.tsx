import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import { TransitionStates, useTransitionState } from "./use-transition-state";

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
        console.log("running timers");
        expect(rendered.find("div").text()).toBe(TransitionStates.active.toString());
    });

    // test("should move from a 'from' state to a 'enter' state when value goes from false -> true" , (): void => {
    //     const rendered: ReactWrapper = mount(
    //         <UseTransitionState duration={300} value={false} />
    //     );

    //     jest.runAllTimers();
    //     expect(rendered.find("div").text()).toBe(TransitionStates.from.toString());

    //     rendered.setProps({value: true})

    //     expect(rendered.find("div").text()).toBe(TransitionStates.enter.toString());
    //     jest.runAllTimers();
    //     expect(rendered.find("div").text()).toBe(TransitionStates.enter.toString());
    // });

    // test("should move from a 'enter' state to a 'leave' state when value goes from true -> false" , (): void => {
    //     const rendered: ReactWrapper = mount(
    //         <UseTransitionState duration={300} value={true} />
    //     );

    //     jest.runAllTimers();
    //     expect(rendered.find("div").text()).toBe(TransitionStates.enter.toString());

    //     rendered.setProps({value: false})

    //     expect(rendered.find("div").text()).toBe(TransitionStates.leave.toString());
    //     jest.runAllTimers();
    //     expect(rendered.find("div").text()).toBe(TransitionStates.leave.toString());
    // });

    // test("should call a callback after the provided period of time", (): void => {
    //     const spy: jest.Mock = jest.fn();
    //     const rendered: ReactWrapper = mount(<UseTransitionState timeout={300} callback={spy} />);

    //     jest.runAllTimers();
    //     expect(spy).toHaveBeenCalledTimes(1);
    // });
    // test("should provided callback when delay is changed", (): void => {
    //     const spy: jest.Mock = jest.fn();
    //     const rendered: ReactWrapper = mount(<UseTransitionState timeout={300} callback={spy} />);

    //     rendered.setProps({ delay: 200 });

    //     jest.runAllTimers();
    //     expect(spy).toHaveBeenCalledTimes(1);
    // });
    // test("should call new callback when one is provided", (): void => {
    //     const spy: jest.Mock = jest.fn();
    //     const spy2: jest.Mock = jest.fn();
    //     const rendered: ReactWrapper = mount(<UseTransitionState timeout={300} callback={spy} />);

    //     rendered.setProps({ callback: spy2 });

    //     jest.runAllTimers();
    //     expect(spy).toHaveBeenCalledTimes(0);
    //     expect(spy2).toHaveBeenCalledTimes(1);
    // });
    // test("should not call timer if component unmounts before timeout", (): void => {
    //     const spy: jest.Mock = jest.fn();
    //     const rendered: ReactWrapper = mount(<UseTransitionState timeout={300} callback={spy} />);

    //     rendered.unmount();
    //     jest.runAllTimers();

    //     expect(spy).toHaveBeenCalledTimes(0);
    // });
    // test("should not invoke callback if timeout is set to null", (): void => {
    //     const spy: jest.Mock = jest.fn();
    //     const rendered: ReactWrapper = mount(<UseTransitionState timeout={300} callback={spy} />);
    //     rendered.setProps({ timeout: null });

    //     jest.runAllTimers();

    //     expect(spy).toHaveBeenCalledTimes(0);
    // });
});
