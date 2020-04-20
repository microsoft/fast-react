import React from "react";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { AutoSuggestOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    autoSuggestOptionDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import AutoSuggestOptionStyles from "@microsoft/fast-components-styles-msft/css/auto-suggest-option-styles.css";
import { MergeManagedClasses } from "../css-modules";
import autoSuggestOptionSchema from "./auto-suggest-option.schema";
import autoSuggestOptionSchema2 from "./auto-suggest-option.schema.2";
import MSFTAutoSuggestOption, {
    AutoSuggestOptionManagedClasses,
    AutoSuggestOptionUnhandledProps,
    AutoSuggestOptionHandledProps as MSFTAutoSuggestOptionHandledProps,
    AutoSuggestOptionProps as MSFTAutoSuggestOptionProps,
} from "./auto-suggest-option";

const AutoSuggestOption = manageJss()(
    withCSSCustomProperties(...autoSuggestOptionDependencies)(
        MergeManagedClasses(MSFTAutoSuggestOption, AutoSuggestOptionStyles)
    )
);
type AutoSuggestOption = InstanceType<typeof AutoSuggestOption>;

type AutoSuggestOptionHandledProps = Subtract<
    MSFTAutoSuggestOptionHandledProps,
    AutoSuggestOptionManagedClasses
>;
type AutoSuggestOptionProps = ManagedJSSProps<
    MSFTAutoSuggestOptionProps,
    AutoSuggestOptionClassNameContract,
    DesignSystem
>;

export {
    AutoSuggestOption,
    AutoSuggestOptionProps,
    AutoSuggestOptionClassNameContract,
    AutoSuggestOptionHandledProps,
    autoSuggestOptionSchema,
    autoSuggestOptionSchema2,
    AutoSuggestOptionUnhandledProps,
};
