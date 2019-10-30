import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { Button as BaseButton } from "@microsoft/fast-components-react-base";
import { classNames } from "@microsoft/fast-web-utilities";
import { get, isFunction } from "lodash-es";
import React from "react";
import { ButtonClassNameContract } from ".";
import { DisplayNamePrefix } from "../utilities";
import {
    ButtonAppearance,
    ButtonHandledProps,
    ButtonProps,
    ButtonUnhandledProps,
} from "./button.props";

/**
 * Button slot options
 */
export enum ButtonSlot {
    before = "before",
    after = "after",
}

// tslint:disable-next-line
const Button = React.forwardRef(
    (props: ButtonProps, ref: React.RefObject<any>): JSX.Element => {
        const {
            appearance,
            beforeContent,
            afterContent,
            managedClasses,
            className,
            children,
            ...unhandledProps
        }: ButtonProps = props;

        return (
            <BaseButton
                {...unhandledProps}
                className={classNames(
                    managedClasses[`button__${ButtonAppearance[appearance]}`],
                    className
                )}
                managedClasses={managedClasses}
            >
                {isFunction(beforeContent) &&
                    beforeContent(managedClasses.button_beforeContent)}
                <span className={managedClasses.button_contentRegion}>{children}</span>
                {isFunction(afterContent) &&
                    afterContent(managedClasses.button_afterContent)}
            </BaseButton>
        );
    }
);

export default Button;
export * from "./button.props";
