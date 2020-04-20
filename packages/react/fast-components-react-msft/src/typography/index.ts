import React from "react";
import {
    Typography as BaseTypography,
    TypographyHandledProps as BaseTypographyHandledProps,
    TypographyProps as BaseTypographyProps,
    TypographyClassNameContract,
    TypographyManagedClasses,
    TypographySize,
    TypographyTag,
    TypographyUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    typographyDependencies,
} from "@microsoft/fast-components-styles-msft";
import TypographyStyles from "@microsoft/fast-components-styles-msft/css/typography.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import typographySchema from "./typography.schema";
import typographySchema2 from "./typography.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Typography = manageJss()(
    withCSSCustomProperties(...typographyDependencies)(
        MergeManagedClasses(BaseTypography, TypographyStyles)
    )
);
type Typography = InstanceType<typeof Typography>;

type TypographyHandledProps = Subtract<
    BaseTypographyHandledProps,
    TypographyManagedClasses
>;
type TypographyProps = ManagedJSSProps<
    BaseTypographyProps,
    TypographyClassNameContract,
    DesignSystem
>;

export {
    TypographyClassNameContract,
    TypographyHandledProps,
    TypographyUnhandledProps,
    Typography,
    TypographyProps,
    typographySchema,
    typographySchema2,
    /**
     * @deprecated
     */
    typographySchema as typograophySchema,
    TypographySize,
    TypographyTag,
};
