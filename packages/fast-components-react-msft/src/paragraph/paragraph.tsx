import { ParagraphClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { TypographySize, TypographyTag } from "@microsoft/fast-components-react-base";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { Typography } from "../typography";
import { DisplayNamePrefix } from "../utilities";
import {
    ParagraphHandledProps,
    ParagraphProps,
    ParagraphSize,
    ParagraphUnhandledProps,
} from "./paragraph.props";

// tslint:disable-next-line
const Paragraph = React.forwardRef(
    (props: ParagraphProps, ref: any): JSX.Element => {
        const {
            size,
            managedClasses,
            className,
            ...unhandledProps
        }: ParagraphProps = props;

        return (
            <Typography
                {...unhandledProps}
                tag={TypographyTag.p}
                size={
                    size === ParagraphSize._1
                        ? TypographySize._5
                        : size === ParagraphSize._2
                            ? TypographySize._6
                            : TypographySize._7
                }
                className={classNames(
                    managedClasses.paragraph,
                    managedClasses[`paragraph__${size}`],
                    className
                )}
            />
        );
    }
);

Paragraph.displayName = `${DisplayNamePrefix}Paragraph`;
Paragraph.defaultProps = {
    size: ParagraphSize._3,
    managedClasses: {},
};

export default Paragraph;
export * from "./paragraph.props";
export { ParagraphClassNameContract };
