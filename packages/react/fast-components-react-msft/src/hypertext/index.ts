import React from "react";
import {
    Hypertext as BaseHypertext,
    HypertextHandledProps as BaseHypertextHandledProps,
    HypertextProps as BaseHypertextProps,
    HypertextClassNameContract,
    HypertextManagedClasses,
    HypertextUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    hypertextDependencies,
} from "@microsoft/fast-components-styles-msft";
import HypertextStyles from "@microsoft/fast-components-styles-msft/css/hypertext.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import hypertextSchema from "./hypertext.schema";
import hypertextSchema2 from "./hypertext.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Hypertext = manageJss()(
    withCSSCustomProperties(...hypertextDependencies)(
        MergeManagedClasses(BaseHypertext, HypertextStyles)
    )
);
type Hypertext = InstanceType<typeof Hypertext>;

type HypertextHandledProps = Subtract<BaseHypertextHandledProps, HypertextManagedClasses>;
type HypertextProps = ManagedJSSProps<
    BaseHypertextProps,
    HypertextClassNameContract,
    DesignSystem
>;

export {
    Hypertext,
    HypertextProps,
    HypertextHandledProps,
    hypertextSchema,
    hypertextSchema2,
    HypertextUnhandledProps,
    HypertextClassNameContract,
};
