import { HypertextClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { HypertextProps } from "./hypertext.props";
import { classNames } from "@microsoft/fast-web-utilities";

// tslint:disable-next-line
const Hypertext = React.forwardRef(
    (props: HypertextProps, ref: any): JSX.Element => {
        const { className, managedClasses, ...unhandledProps }: HypertextProps = props;
        return (
            <a
                {...unhandledProps}
                className={classNames(managedClasses.hypertext, className)}
            />
        );
    }
);
Hypertext.displayName = `${DisplayNamePrefix}Hypertext`;
Hypertext.defaultProps = {
    managedClasses: {},
};

export default Hypertext;
export * from "./hypertext.props";
export { HypertextClassNameContract };
