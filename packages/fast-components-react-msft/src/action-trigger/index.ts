import React from "react";
import { ActionTriggerClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import {
    ActionTriggerStyles,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import MSFTActionTrigger, {
    ActionTriggerAppearance,
    ActionTriggerHandledProps as MSFTActionTriggerHandledProps,
    ActionTriggerManagedClasses,
    ActionTriggerProps as MSFTActionTriggerProps,
    ActionTriggerUnhandledProps,
} from "./action-trigger";
import actionTriggerSchema from "./action-trigger.schema";
import { Subtract } from "utility-types";
import { actionTriggerSheetIndex } from "../stylesheet-order";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const ActionTrigger = manageJss(ActionTriggerStyles, { index: actionTriggerSheetIndex })(
    MSFTActionTrigger
);
type ActionTrigger = InstanceType<typeof ActionTrigger>;

interface ActionTriggerHandledProps
    extends Subtract<MSFTActionTriggerHandledProps, ActionTriggerManagedClasses> {}
type ActionTriggerProps = ManagedJSSProps<
    MSFTActionTriggerProps,
    ActionTriggerClassNameContract,
    DesignSystem
>;

export {
    ActionTrigger,
    ActionTriggerAppearance,
    ActionTriggerProps,
    ActionTriggerClassNameContract,
    ActionTriggerHandledProps,
    actionTriggerSchema,
    ActionTriggerUnhandledProps,
};
