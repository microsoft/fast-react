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
import { get, has, isFunction, isString, memoize } from "lodash-es";
import React from "react";
import { BackgroundProps } from "./background.props";

const getDesignSystemOverrides: (color: string) => Partial<DesignSystem> = memoize(
    (color: string): Partial<DesignSystem> => {
        return { backgroundColor: color };
    }
);

// tslint:disable:jsx-no-lambda
// tslint:disable-next-line
const Background = React.forwardRef(
    (props: BackgroundProps): JSX.Element => {
        const {
            value,
            style,
            drawBackground,
            designSystemMergingFunction,
            tag,
            children,
            ...unhandled
        }: BackgroundProps = props;

        return (
            <DesignSystemConsumer>
                {(designSystem: DesignSystem): JSX.Element => {
                    const color: string = isString(value)
                        ? value
                        : isFunction(value)
                            ? value(designSystem)
                            : has(designSystem.neutralPalette, value)
                                ? get(designSystem.neutralPalette, value)
                                : DesignSystemDefaults.neutralPalette[value] ||
                                  (Background.defaultProps.value as DesignSystemResolver<
                                      string
                                  >)(DesignSystemDefaults);
                    const mergedStyle: React.CSSProperties = drawBackground
                        ? { ...style, backgroundColor: color }
                        : style;

                    return (
                        <DesignSystemProvider
                            designSystem={getDesignSystemOverrides(color)}
                            designSystemMergingFunction={designSystemMergingFunction}
                        >
                            {tag
                                ? React.createElement(
                                      tag,
                                      { ...unhandled, mergedStyle },
                                      children
                                  )
                                : children}
                        </DesignSystemProvider>
                    );
                }}
            </DesignSystemConsumer>
        );
    }
);

Background.defaultProps = {
    tag: "div",
    value: neutralLayerL1,
    drawBackground: true,
};

export default Background;
export * from "./background.props";
// tslint:enable:jsx-no-lambda
