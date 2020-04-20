import React from "react";
import { ButtonBaseClassNameContract as StealthButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    stealthButtonDependencies,
} from "@microsoft/fast-components-styles-msft";
import StealthButtonStyles from "@microsoft/fast-components-styles-msft/css/stealth-button.css";
import { Subtract } from "utility-types";
import {
    ButtonBase,
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses,
    ButtonBaseProps,
    ButtonBaseUnhandledProps as StealthButtonUnhandledProps,
} from "../button-base";
import { DisplayNamePrefix } from "../utilities";
import { MergeManagedClasses } from "../css-modules";
import stealthButtonSchema from "./stealth-button.schema";
import stealthButtonSchema2 from "./stealth-button.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const StealthButton = manageJss()(
    withCSSCustomProperties(...stealthButtonDependencies)(
        MergeManagedClasses(ButtonBase, StealthButtonStyles)
    )
);
type StealthButton = InstanceType<typeof StealthButton>;

type StealthButtonHandledProps = Subtract<
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses
>;
type StealthButtonProps = ManagedJSSProps<
    ButtonBaseProps,
    StealthButtonClassNameContract,
    DesignSystem
>;

/**
 * Set the display name for the stealth button
 */
StealthButton.displayName = `${DisplayNamePrefix}StealthButton`;

export {
    StealthButton,
    StealthButtonProps,
    StealthButtonClassNameContract,
    StealthButtonHandledProps,
    StealthButtonUnhandledProps,
    stealthButtonSchema,
    stealthButtonSchema2,
};
