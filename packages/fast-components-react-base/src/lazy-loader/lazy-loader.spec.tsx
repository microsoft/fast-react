import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import LazyLoader, { LazyLoaderUnhandledProps } from "./lazy-loader";
import { DisplayNamePrefix } from "../utilities";
import Button from "../button";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

// viewport rect is deliberately offset so we are testing that
// calculations are correct when the viewport is not positioned at origin (i.e. x and y = 0)
const viewportRect: ClientRect = {
    top: 100,
    right: 250,
    bottom: 200,
    left: 150,
    height: 100,
    width: 100,
};

/* tslint:disable:no-string-literal */
describe("viewport virtualizer", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(LazyLoader as any).name}`).toBe(
            LazyLoader.displayName
        );
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<LazyLoader />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: LazyLoaderUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<LazyLoader {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("should merge unhandledProps style properties with existing styles from the component", (): void => {
        const unhandledProps: LazyLoaderUnhandledProps = {
            style: {
                width: "100px",
                height: "200px",
            },
        };
        const expectedStyles: Partial<React.CSSProperties> = {
            opacity: 0,
            position: "relative",
            transformOrigin: "left top",
            transform: `translate(
                0px, 
                0px
            )`,
            top: null,
            right: null,
            bottom: null,
            left: null,
            width: "100px",
            height: "200px",
        };
        const rendered: any = shallow(<LazyLoader {...unhandledProps} />);

        expect(rendered.first().prop("style")).toEqual(expectedStyles);
    });
});
