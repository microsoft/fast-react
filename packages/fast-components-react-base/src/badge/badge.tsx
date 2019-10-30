import { BadgeClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { BadgeProps } from "./badge.props";
// tslint:disable-next-line
const Badge = React.forwardRef(
    (props: BadgeProps): JSX.Element => {
        const { managedClasses, className, ...unhandledProps }: BadgeProps = props;

        return (
            <span
                {...unhandledProps}
                className={classNames(managedClasses.badge, className)}
            />
        );
    }
);

Badge.displayName = `${DisplayNamePrefix}Badge`;
Badge.defaultProps = {
    managedClasses: {},
};

export default React.memo(Badge);
export * from "./badge.props";
export { BadgeClassNameContract };
