import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    DesignSystem,
    DesignSystemDefaults,
    DesignSystemResolver,
    neutralLayerL1,
} from "@microsoft/fast-components-styles-msft";
import {
    DesignSystemConsumer,
    DesignSystemProvider,
} from "@microsoft/fast-jss-manager-react";
import { get, has, memoize } from "lodash-es";
import React from "react";
import { Omit } from "utility-types";
import { BackgroundHandledProps, BackgroundProps, BackgroundUnhandledProps } from "./background.props";

const getDesignSystemOverrides: (color: string) => Partial<DesignSystem> = memoize(
    (color: string): Partial<DesignSystem> => {
        return { backgroundColor: color };
    }
);


// tslint:disable:jsx-no-lambda
// tslint:disable-next-line
const Background = React.forwardRef((props: BackgroundProps): JSX.Element => {
    const {
        value,
        style
        drawBackground
    }: BackgroundProps = props;

    return (
        <DesignSystemConsumer>
            {(designSystem: DesignSystem): JSX.Element => {
                const color: string =
                    typeof value === "string"
                    ? value
                    : typeof value === "function"
                    ? value(designSystem)
                    : has(designSystem.neutralPalette, value)
                    ? get(designSystem.neutralPalette, value)
                    : DesignSystemDefaults.neutralPalette[value] ||
                    (Background.defaultProps.value as DesignSystemResolver<string>)(DesignSystemDefaults);
                // const styleTwo: React.CSSProperties = Object.assign(
                // {},
                //     style,
                //     drawBackground
                //     ? {
                //         backgroundColor: color,
                //     }
                //     : void 0
                // );
                return <div>wee</div>
            }}
        </DesignSystemConsumer>
    )
});

Background.defaultProps = {
    tag: "div",
    value: neutralLayerL1,
    drawBackground: true,
};
export default class BackgroundTwo extends Foundation<
    BackgroundHandledProps,
    BackgroundUnhandledProps,
    {}
    > {
        public static defaultProps: Partial<
        Omit<BackgroundHandledProps, "value"> & { value: DesignSystemResolver<string> }
        > = {
            tag: "div",
            value: neutralLayerL1,
            drawBackground: true,
        };
        protected handledProps: HandledProps<Required<BackgroundHandledProps>> = {
            tag: void 0,
            value: void 0,
            drawBackground: void 0,
            designSystemMergingFunction: void 0,
        };


        public render(): JSX.Element {
            return <DesignSystemConsumer>{this.withContext}</DesignSystemConsumer>;
        }

        private withContext = (designSystem: DesignSystem): JSX.Element => {
            const background: string | number | DesignSystemResolver<string> = this.props
                .value;
            const color: string =
                typeof background === "string"
                ? background
                : typeof background === "function"
                ? background(designSystem)
                : has(designSystem.neutralPalette, background)
                ? get(designSystem.neutralPalette, background)
                : DesignSystemDefaults.neutralPalette[background] ||
                Background.defaultProps.value(DesignSystemDefaults);

            const style: React.CSSProperties = Object.assign(
                {},
                this.props.style,
                this.props.drawBackground
                ? {
                    backgroundColor: color,
                }
                : void 0
            );

            return (
                <DesignSystemProvider
                    designSystem={this.getDesignSystemOverrides(color)}
                    designSystemMergingFunction={this.props.designSystemMergingFunction}
                >
                    {(this.tag && (
                        <this.tag {...this.unhandledProps()} style={style}>
                            {this.props.children}
                        </this.tag>
                    )) ||
                    this.props.children}
                </DesignSystemProvider>
            );
        };

        private get tag(): any {
            return this.props.tag;
        }
    }

export * from "./background.props";
// tslint:enable:jsx-no-lambda
