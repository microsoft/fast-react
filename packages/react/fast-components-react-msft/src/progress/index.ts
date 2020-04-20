import React from "react";
import { ProgressClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    progressDependencies,
} from "@microsoft/fast-components-styles-msft";
import ProgressStyles from "@microsoft/fast-components-styles-msft/css/progress.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import MSFTProgress, {
    ProgressHandledProps as MSFTProgressHandledProps,
    ProgressProps as MSFTProgressProps,
    ProgressManagedClasses,
    ProgressSize,
    ProgressUnhandledProps,
} from "./progress";
import progressSchema from "./progress.schema";
import progressSchema2 from "./progress.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Progress = manageJss()(
    withCSSCustomProperties(...progressDependencies)(
        MergeManagedClasses(MSFTProgress, ProgressStyles)
    )
);
type Progress = InstanceType<typeof Progress>;

type ProgressHandledProps = Subtract<MSFTProgressHandledProps, ProgressManagedClasses>;
type ProgressProps = ManagedJSSProps<
    MSFTProgressProps,
    ProgressClassNameContract,
    DesignSystem
>;

export {
    Progress,
    ProgressProps,
    ProgressUnhandledProps,
    ProgressHandledProps,
    progressSchema,
    progressSchema2,
    ProgressSize,
    ProgressClassNameContract,
};
