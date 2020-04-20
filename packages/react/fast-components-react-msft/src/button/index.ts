import React from "react";
import { ButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { buttonDependencies, DesignSystem } from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import ButtonStyles from "@microsoft/fast-components-styles-msft/css/button.css";
import { MergeManagedClasses } from "../css-modules";
import MSFTButton, {
    ButtonAppearance,
    ButtonManagedClasses,
    ButtonSlot,
    ButtonUnhandledProps,
    ButtonHandledProps as MSFTButtonHandledProps,
    ButtonProps as MSFTButtonProps,
} from "./button";
import buttonSchema from "./button.schema";
import buttonSchema2 from "./button.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Button = manageJss()(
    withCSSCustomProperties(...buttonDependencies)(
        MergeManagedClasses(MSFTButton, ButtonStyles)
    )
);
type Button = InstanceType<typeof Button>;

type ButtonHandledProps = Subtract<MSFTButtonHandledProps, ButtonManagedClasses>;
type ButtonProps = ManagedJSSProps<
    MSFTButtonProps,
    ButtonClassNameContract,
    DesignSystem
>;

export {
    Button,
    ButtonAppearance,
    ButtonSlot,
    ButtonProps,
    ButtonClassNameContract,
    ButtonHandledProps,
    buttonSchema,
    buttonSchema2,
    ButtonUnhandledProps,
};
