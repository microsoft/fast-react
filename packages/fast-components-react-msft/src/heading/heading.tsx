import { HeadingClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { TypographySize, TypographyTag } from "@microsoft/fast-components-react-base";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { Typography } from "../typography";
import { DisplayNamePrefix } from "../utilities";
import { HeadingProps, HeadingSize } from "./heading.props";

// tslint:disable-next-line
const Heading = React.forwardRef((props: HeadingProps, ref: any) => {
    const {
        className,
        size,
        managedClasses,
        tag,
        ...unhandledProps
    }: HeadingProps = props;

    return (
        <Typography
            {...unhandledProps}
            tag={TypographyTag[tag] || TypographyTag.h1}
            size={TypographySize[`_${size}`]}
            className={classNames(
                managedClasses.heading,
                managedClasses[`heading__${size}`],
                className
            )}
        />
    );
});

Heading.displayName = `${DisplayNamePrefix}Heading`;
Heading.defaultProps = {
    size: HeadingSize._1,
    managedClasses: {},
};

export default Heading;
export * from "./heading.props";
export { HeadingClassNameContract };
