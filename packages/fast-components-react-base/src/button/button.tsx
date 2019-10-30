import { ButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { ButtonProps } from "./button.props";
import { isString } from "lodash-es";

/**
 * Button HTML tags
 */
export enum ButtonHTMLTags {
    a = "a",
    button = "button",
}

// tslint:disable-next-line
const Button = React.forwardRef(
    (
        props: ButtonProps,
        ref: React.RefObject<HTMLAnchorElement | HTMLButtonElement>
    ): JSX.Element => {
        const {
            disabled,
            href,
            managedClasses,
            className,
            children,
            ...unhandledProps
        }: ButtonProps = props;
        const isAnchor: boolean = isString(href);
        const Tag: any = isAnchor ? ButtonHTMLTags.a : ButtonHTMLTags.button;

        return (
            <Tag
                ref={ref}
                {...unhandledProps}
                className={
                    classNames(
                        managedClasses.button,
                        [managedClasses.button__disabled, disabled],
                        className
                    ) || null
                }
                href={isAnchor ? href : null}
                disabled={(disabled && !isAnchor) || null}
                aria-disabled={(disabled && isAnchor) || null}
            >
                {children}
            </Tag>
        );
    }
);

Button.displayName = `${DisplayNamePrefix}Button`;
Button.defaultProps = {
    managedClasses: {},
};

export default React.memo(Button);
export * from "./button.props";
export { ButtonClassNameContract };
