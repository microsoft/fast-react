import React from "react";
import { FoundationProps } from "@microsoft/fast-components-foundation-react";
import {
    Label as BaseLabel,
    LabelHandledProps as BaseLabelHandledProps,
    LabelProps as BaseLabelProps,
    LabelClassNameContract,
    LabelManagedClasses,
    LabelTag,
    LabelUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { DesignSystem, labelDependencies } from "@microsoft/fast-components-styles-msft";
import LabelStyles from "@microsoft/fast-components-styles-msft/css/label.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import labelSchema from "./label.schema";
import labelSchema2 from "./label.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Label = manageJss()(
    withCSSCustomProperties(...labelDependencies)(
        MergeManagedClasses(BaseLabel, LabelStyles)
    )
);
type Label = InstanceType<typeof Label>;

type LabelHandledProps = Subtract<BaseLabelHandledProps, LabelManagedClasses>;
type LabelProps = ManagedJSSProps<BaseLabelProps, LabelClassNameContract, DesignSystem>;

export {
    LabelClassNameContract,
    LabelHandledProps,
    LabelUnhandledProps,
    Label,
    LabelProps,
    labelSchema,
    labelSchema2,
    LabelTag,
};
