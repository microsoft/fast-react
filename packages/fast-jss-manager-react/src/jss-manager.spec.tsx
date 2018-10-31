import * as React from "react";
import { JSSManager } from "./jss-manager";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import * as ShallowRenderer from "react-test-renderer/shallow";
import { configure, mount, ReactWrapper, render, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { jss, stylesheetRegistry } from "./jss";
import { DesignSystemProvider } from "./design-system-provider";

configure({ adapter: new Adapter() });

class SimpleComponent extends React.Component<any, any> {
    public render(): boolean {
        return true;
    }
}

/**
 * JSS stylesheet with only static values for CSS properties
 */
const staticStyles: ComponentStyles<any, any> = {
    staticStyleClass: {
        color: "red",
    },
};

/**
 * JSS stylesheet with dynamic values for CSS properties
 */
const dynamicStyles: ComponentStyles<any, any> = {
    dynamicStylesClass: {
        background: (): string => {
            return "blue";
        },
    },
};

/**
 * JSS stylesheet defined as a function
 */
const stylesheetResolver: ComponentStyles<any, any> = (config: any): any => {
    return {
        resolvedStylesClass: {
            background: "green",
            color: (): string => {
                return "yellow";
            },
        },
    };
};

/**
 * JSS stylesheet with static and dynamic values for CSS properties
 */
const staticAndDynamicStyles: ComponentStyles<any, any> = {
    staticAndDynamicStylesClass: {
        ...staticStyles.staticStyleClass,
        ...dynamicStyles.dynamicStylesClass,
    },
};

describe("The JSSManager", (): void => {
    interface TestDesignSystem {
        color: string;
    }

    function renderChild(): string {
        return "children";
    }

    // JSS doesn't export their StyleSheet class, so we can compile a stylesheet and
    // access it's constructor to get a reference to the StyleSheet class.
    const StyleSheet: any = jss.createStyleSheet({}).constructor;

    const stylesheet: any = {
        class: {
            color: (config: TestDesignSystem): string => {
                return config.color;
            },
        },
    };

    const testDesignSystem: TestDesignSystem = {
        color: "red",
    };

    function functionStyleSheet(config: TestDesignSystem): any {
        return {
            class: {
                color: config.color,
            },
        };
    }

    test("should not throw when no stylesheet is provided", (): void => {
        expect(
            (): void => {
                mount(<JSSManager render={renderChild} />);
            }
        ).not.toThrow();
    });

    test("should not throw when no stylesheet is provided and design system is changed", (): void => {
        const rendered: ReactWrapper = mount(
            <JSSManager designSystem={testDesignSystem} render={renderChild} />
        );

        expect(
            (): void => {
                rendered.setProps({ designSystem: { color: "blue" } });
            }
        ).not.toThrow();
    });

    test("should compile a stylesheet when mounting", (): void => {
        const objectStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                render={renderChild}
                designSystem={testDesignSystem}
                styles={stylesheet}
            />
        );

        const functionStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                render={renderChild}
                styles={functionStyleSheet}
                designSystem={testDesignSystem}
            />
        );

        expect(objectStylesheetComponent.state("primaryStyleSheet")).toBeInstanceOf(
            StyleSheet
        );
        expect(objectStylesheetComponent.state("primaryStyleSheet").attached).toBe(true);

        expect(functionStylesheetComponent.state("primaryStyleSheet")).toBeInstanceOf(
            StyleSheet
        );
        expect(functionStylesheetComponent.state("primaryStyleSheet").attached).toBe(
            true
        );
    });

    test("should update an object stylesheet when the design-system changes", (): void => {
        const objectStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                designSystem={{ color: "blue" }}
                styles={stylesheet}
                render={renderChild}
            />
        );

        const functionStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                designSystem={{ color: "blue" }}
                styles={functionStyleSheet}
                render={renderChild}
            />
        );

        const mock: any = jest.fn();

        objectStylesheetComponent.state("primaryStyleSheet").update = mock;
        objectStylesheetComponent.setProps({ designSystem: testDesignSystem });

        expect(mock.mock.calls).toHaveLength(1);
        expect(mock.mock.calls[0][0]).toEqual(testDesignSystem);

        const functionSheet: any = functionStylesheetComponent.state("primaryStyleSheet");
        functionStylesheetComponent.setProps({
            designSystem: testDesignSystem,
        });

        // Function stylesheets must be completely re-generated when the design-system changes,
        // so check identity
        expect(functionStylesheetComponent.state("primaryStyleSheet")).not.toBe(
            functionSheet
        );
    });

    test("should remove stylesheets when unmounting", (): void => {
        const objectStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                designSystem={{ color: "red" }}
                styles={stylesheet}
                render={renderChild}
            />
        );

        const functionStylesheetComponent: ReactWrapper = mount(
            <JSSManager
                designSystem={{ color: "red" }}
                styles={stylesheet}
                render={renderChild}
            />
        );

        const objectSheet: any = objectStylesheetComponent.state("primaryStyleSheet");
        const functionSheet: any = functionStylesheetComponent.state("primaryStyleSheet");

        expect(objectSheet.attached).toBe(true);
        expect(functionSheet.attached).toBe(true);

        objectStylesheetComponent.unmount();
        functionStylesheetComponent.unmount();

        expect(objectSheet.attached).toBe(false);
        expect(functionSheet.attached).toBe(false);
    });

    test("should create a secondary stylesheet when jssStyleSheet is used", () => {
        const rendered: any = shallow(
            <JSSManager
                jssStyleSheet={stylesheet}
                designSystem={testDesignSystem}
                render={renderChild}
            />
        );

        expect(rendered.state("secondaryStyleSheet")).not.toBeUndefined();
    });

    test("should not update the primary stylesheet when jssStyleSheet props are changed", () => {
        const rendered: any = shallow(
            <JSSManager
                styles={stylesheet}
                designSystem={testDesignSystem}
                render={renderChild}
            />
        );

        const sheet: any = rendered.state("primaryStyleSheet");
        sheet.update = jest.fn();

        rendered.setProps({ jssStyleSheet: { class: { color: "blue" } } });

        expect(rendered.state("primaryStyleSheet")).toBe(sheet);
        expect(rendered.state("primaryStyleSheet").update).toBe(sheet.update);
        expect(sheet.update).not.toHaveBeenCalled();
    });

    test("should store all stylesheets in the registry", (): void => {
        stylesheetRegistry.reset();
        expect(stylesheetRegistry.registry.length).toBe(0);

        const rendered: any = shallow(
            <JSSManager
                styles={stylesheet}
                designSystem={testDesignSystem}
                render={renderChild}
            />
        );

        expect(stylesheetRegistry.registry.length).toBe(1);
    });

    test("should render a parent with a higher index than a child", (): void => {
        function renderChildJSSManager(): React.ReactNode {
            return (
                <JSSManager
                    styles={stylesheet}
                    designSystem={testDesignSystem}
                    render={renderChild}
                />
            );
        }

        const rendered: any = mount(
            <JSSManager
                styles={stylesheet}
                designSystem={testDesignSystem}
                render={renderChildJSSManager}
            />
        );

        expect(rendered.instance().primaryStylesheetIndex).toBeGreaterThan(
            rendered.children().instance().primaryStylesheetIndex
        );
    });

    test("should assign a secondary stylesheet a higher index than a the primary stylesheet", () => {
        const rendered: any = mount(
            <JSSManager
                styles={stylesheet}
                jssStyleSheet={{ className: { color: "blue" } }}
                designSystem={testDesignSystem}
                render={renderChild}
            />
        );

        expect(
            rendered.state("primaryStyleSheet").options.index <
                rendered.state("secondaryStyleSheet").options.index
        ).toBeTruthy();
    });
});
