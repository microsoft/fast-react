import { Badge as BaseBadge } from "@microsoft/fast-components-react-base";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { BadgeProps, BadgeSize } from "./badge.props";

// tslint:disable-next-line
const Badge = React.forwardRef(
    (props: BadgeProps, ref: any): JSX.Element => {
        const {
            className,
            managedClasses,
            filled,
            size,
            ...unhandledProps
        }: BadgeProps = props;
        return (
            <BaseBadge
                {...unhandledProps}
                className={classNames(
                    [managedClasses.badge__filled, filled],
                    [managedClasses.badge__large, size === BadgeSize.large],
                    [managedClasses.badge__small, size === BadgeSize.small]
                )}
            />
        );
    }
);

Badge.displayName = `${DisplayNamePrefix}Badge`;
Badge.defaultProps = {
    size: BadgeSize.small,
    filled: true,
    managedClasses: {},
};

export default Badge;
export * from "./badge.props";
