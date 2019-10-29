import { ButtonBaseClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { Button as BaseButton } from "@microsoft/fast-components-react-base";
import { classNames } from "@microsoft/fast-web-utilities";
import { isFunction, isNil } from "lodash-es";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import {
    ButtonBaseHandledProps,
    ButtonBaseProps,
    ButtonBaseUnhandledProps,
} from "./button-base.props";

// tslint:disable-next-line
const ButtonBase = React.forwardRef(
    (props: ButtonBaseProps, ref: React.RefObject<any>): JSX.Element => {
        const {
            afterContent,
            beforeContent,
            children,
            managedClasses,
            className,
            ...unhandledProps
        }: ButtonBaseProps = props;

        return (
            <BaseButton
                ref={ref}
                {...unhandledProps}
                managedClasses={managedClasses}
                className={
                    classNames(
                        [
                            managedClasses.button__hasBeforeOrAfterAndChildren,
                            !isNil(children) &&
                                !isNil(beforeContent || !isNil(afterContent)),
                        ],
                        className
                    ) || null
                }
            >
                {isFunction(beforeContent) &&
                    beforeContent(managedClasses.button_beforeContent)}
                {children}
                {isFunction(afterContent) &&
                    afterContent(managedClasses.button_afterContent)}
            </BaseButton>
        );
    }
);

ButtonBase.displayName = `${DisplayNamePrefix}ButtonBase`;
ButtonBase.defaultProps = {
    managedClasses: {},
};

export default React.memo(ButtonBase);
export * from "./button-base.props";
