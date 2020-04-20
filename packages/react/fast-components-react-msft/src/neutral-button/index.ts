import React from "react";
import { ButtonBaseClassNameContract as NeutralButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    neutralButtonDependencies,
} from "@microsoft/fast-components-styles-msft";
import NeutralButtonStyles from "@microsoft/fast-components-styles-msft/css/neutral-button.css";
import { Subtract } from "utility-types";
import {
    ButtonBase,
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses,
    ButtonBaseProps,
    ButtonBaseUnhandledProps as NeutralButtonUnhandledProps,
} from "../button-base";
import { DisplayNamePrefix } from "../utilities";
import { MergeManagedClasses } from "../css-modules";
import neutralButtonSchema from "./neutral-button.schema";
import neutralButtonSchema2 from "./neutral-button.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const NeutralButton = manageJss()(
    withCSSCustomProperties(...neutralButtonDependencies)(
        MergeManagedClasses(ButtonBase, NeutralButtonStyles)
    )
);
type NeutralButton = InstanceType<typeof NeutralButton>;

type NeutralButtonHandledProps = Subtract<
    ButtonBaseHandledProps,
    ButtonBaseManagedClasses
>;
type NeutralButtonProps = ManagedJSSProps<
    ButtonBaseProps,
    NeutralButtonClassNameContract,
    DesignSystem
>;

/**
 * Set the display name for the neutral button
 */
NeutralButton.displayName = `${DisplayNamePrefix}NeutralButton`;

export {
    NeutralButton,
    NeutralButtonProps,
    NeutralButtonClassNameContract,
    NeutralButtonHandledProps,
    NeutralButtonUnhandledProps,
    neutralButtonSchema,
    neutralButtonSchema2,
};
