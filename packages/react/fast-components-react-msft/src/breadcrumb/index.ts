import React from "react";
import {
    Breadcrumb as BaseBreadcrumb,
    BreadcrumbHandledProps as BaseBreadcrumbHandledProps,
    BreadcrumbProps as BaseBreadcrumbProps,
    BreadcrumbClassNameContract,
    BreadcrumbManagedClasses,
    BreadcrumbUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    breadcrumbDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import BreadcrumbStyles from "@microsoft/fast-components-styles-msft/css/breadcrumb.css";
import { MergeManagedClasses } from "../css-modules";
import breadcrumbSchema from "./breadcrumb.schema";
import breadcrumbSchema2 from "./breadcrumb.schema.2";

const Breadcrumb = manageJss()(
    withCSSCustomProperties(...breadcrumbDependencies)(
        MergeManagedClasses(BaseBreadcrumb, BreadcrumbStyles)
    )
);
type Breadcrumb = InstanceType<typeof Breadcrumb>;

type BreadcrumbHandledProps = Subtract<
    BaseBreadcrumbHandledProps,
    BreadcrumbManagedClasses
>;
type BreadcrumbProps = ManagedJSSProps<
    BaseBreadcrumbProps,
    BreadcrumbClassNameContract,
    DesignSystem
>;

export {
    Breadcrumb,
    BreadcrumbProps,
    BreadcrumbClassNameContract,
    BreadcrumbHandledProps,
    breadcrumbSchema,
    breadcrumbSchema2,
    BreadcrumbUnhandledProps,
};
