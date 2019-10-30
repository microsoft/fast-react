import { TypographyClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import {
    TypographyHandledProps,
    TypographyProps,
    TypographySize,
    TypographyTag,
    TypographyUnhandledProps,
} from "./typography.props";

// tslint:disable-next-line
const Typography = React.forwardRef(
    (props: TypographyProps, ref: any): JSX.Element => {
        const {
            tag,
            className,
            managedClasses,
            size,
            ...unhandledProps
        }: TypographyProps = props;

        return React.createElement(TypographyTag[tag] || TypographyTag.p, {
            ...unhandledProps,
            className: classNames(
                managedClasses.typography,
                managedClasses[`typography___${size}`],
                className
            ),
        });
    }
);

Typography.displayName = `${DisplayNamePrefix}Typography`;
Typography.defaultProps = {
    tag: TypographyTag.p,
    size: TypographySize._1,
    managedClasses: {},
};

export default Typography;
export * from "./typography.props";
export { TypographyClassNameContract };
