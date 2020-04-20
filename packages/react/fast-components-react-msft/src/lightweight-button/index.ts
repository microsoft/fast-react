import React from "react";
import { ButtonBaseClassNameContract as LightweightButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    lightweightButtonDependencies,
} from "@microsoft/fast-components-styles-msft";
import LightweightButtonStyles from "@microsoft/fast-components-styles-msft/css/lightweight-button.css";
import { Subtract } from "utility-types";
import {
    ButtonBase,
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses,
    ButtonBaseProps,
    ButtonBaseUnhandledProps as LightweightButtonUnhandledProps,
} from "../button-base";
import { DisplayNamePrefix } from "../utilities";
import { MergeManagedClasses } from "../css-modules";
import lightweightButtonSchema from "./lightweight-button.schema";
import lightweightButtonSchema2 from "./lightweight-button.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const LightweightButton = manageJss()(
    withCSSCustomProperties(...lightweightButtonDependencies)(
        MergeManagedClasses(ButtonBase, LightweightButtonStyles)
    )
);
type LightweightButton = InstanceType<typeof LightweightButton>;

type LightweightButtonHandledProps = Subtract<
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses
>;
type LightweightButtonProps = ManagedJSSProps<
    ButtonBaseProps,
    LightweightButtonClassNameContract,
    DesignSystem
>;

/**
 * Set the display name for the lightweight button
 */
LightweightButton.displayName = `${DisplayNamePrefix}LightweightButton`;

export {
    LightweightButton,
    LightweightButtonProps,
    LightweightButtonClassNameContract,
    LightweightButtonHandledProps,
    LightweightButtonUnhandledProps,
    lightweightButtonSchema,
    lightweightButtonSchema2,
};
