import React from "react";
import MSFTPivotBase, {
    PivotBaseHandledProps,
    PivotBaseManagedClasses,
    PivotBaseProps,
    PivotBaseUnhandledProps,
} from "./pivot-base";
import {
    DesignSystem,
    PivotStyles,
} from "@microsoft/fast-components-styles-msft";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import pivotBaseSchema from "./pivot-base.schema";
import { PivotClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const PivotBase = manageJss(PivotStyles)(MSFTPivotBase);
type PivotBase = InstanceType<typeof PivotBase>;

export {
    PivotBase,
    PivotBaseProps,
    PivotClassNameContract,
    PivotBaseHandledProps,
    PivotBaseManagedClasses,
    PivotBaseUnhandledProps,
    pivotBaseSchema,
};
