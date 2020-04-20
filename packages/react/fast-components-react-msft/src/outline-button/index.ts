import React from "react";
import { ButtonBaseClassNameContract as OutlineButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    outlineButtonDependencies,
} from "@microsoft/fast-components-styles-msft";
import OutlineButtonStyles from "@microsoft/fast-components-styles-msft/css/outline-button.css";
import { Subtract } from "utility-types";
import {
    ButtonBase,
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses,
    ButtonBaseProps,
    ButtonBaseUnhandledProps as OutlineButtonUnhandledProps,
} from "../button-base";
import { DisplayNamePrefix } from "../utilities";
import { MergeManagedClasses } from "../css-modules";
import outlineButtonSchema from "./outline-button.schema";
import outlineButtonSchema2 from "./outline-button.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const OutlineButton = manageJss()(
    withCSSCustomProperties(...outlineButtonDependencies)(
        MergeManagedClasses(ButtonBase, OutlineButtonStyles)
    )
);
type OutlineButton = InstanceType<typeof OutlineButton>;

type OutlineButtonHandledProps = Subtract<
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses
>;
type OutlineButtonProps = ManagedJSSProps<
    ButtonBaseProps,
    OutlineButtonClassNameContract,
    DesignSystem
>;

/**
 * Set the display name for the outline button
 */
OutlineButton.displayName = `${DisplayNamePrefix}OutlineButton`;

export {
    OutlineButton,
    OutlineButtonProps,
    OutlineButtonClassNameContract,
    OutlineButtonHandledProps,
    OutlineButtonUnhandledProps,
    outlineButtonSchema,
    outlineButtonSchema2,
};
