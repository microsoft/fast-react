import React from "react";
import { CallToActionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    callToActionDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import CallToActionStyles from "@microsoft/fast-components-styles-msft/css/call-to-action.css";
import { MergeManagedClasses } from "../css-modules";
import MSFTCallToAction, {
    CallToActionAppearance,
    CallToActionManagedClasses,
    CallToActionUnhandledProps,
    CallToActionHandledProps as MSFTCallToActionHandledProps,
    CallToActionProps as MSFTCallToActionProps,
} from "./call-to-action";
import callToActionSchema from "./call-to-action.schema";
import callToActionSchema2 from "./call-to-action.schema.2";
/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const CallToAction = manageJss()(
    withCSSCustomProperties(...callToActionDependencies)(
        MergeManagedClasses(MSFTCallToAction, CallToActionStyles)
    )
);
type CallToAction = InstanceType<typeof CallToAction>;

type CallToActionHandledProps = Subtract<
    MSFTCallToActionHandledProps,
    CallToActionManagedClasses
>;
type CallToActionProps = ManagedJSSProps<
    MSFTCallToActionProps,
    CallToActionClassNameContract,
    DesignSystem
>;

export {
    CallToAction,
    CallToActionAppearance,
    CallToActionProps,
    CallToActionClassNameContract,
    CallToActionHandledProps,
    callToActionSchema,
    callToActionSchema2,
    CallToActionUnhandledProps,
};
