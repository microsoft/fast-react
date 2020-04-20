import React from "react";
import { AutoSuggestClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    autoSuggestDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import AutoSuggestStyles from "@microsoft/fast-components-styles-msft/css/auto-suggest.css";
import { MergeManagedClasses } from "../css-modules";
import MSFTAutoSuggest, {
    AutoSuggestManagedClasses,
    AutoSuggestUnhandledProps,
    AutoSuggestHandledProps as MSFTAutoSuggestHandledProps,
    AutoSuggestProps as MSFTAutoSuggestProps,
} from "./auto-suggest";
import autoSuggestSchema from "./auto-suggest.schema";
import autoSuggestSchema2 from "./auto-suggest.schema.2";
/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const AutoSuggest = manageJss()(
    withCSSCustomProperties(...autoSuggestDependencies)(
        MergeManagedClasses(MSFTAutoSuggest, AutoSuggestStyles)
    )
);
type AutoSuggest = InstanceType<typeof AutoSuggest>;

type AutoSuggestHandledProps = Subtract<
    MSFTAutoSuggestHandledProps,
    AutoSuggestManagedClasses
>;
type AutoSuggestProps = ManagedJSSProps<
    MSFTAutoSuggestProps,
    AutoSuggestClassNameContract,
    DesignSystem
>;

export {
    AutoSuggest,
    AutoSuggestProps,
    AutoSuggestClassNameContract,
    AutoSuggestHandledProps,
    autoSuggestSchema,
    autoSuggestSchema2,
    AutoSuggestUnhandledProps,
};
