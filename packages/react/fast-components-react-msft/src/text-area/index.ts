import React from "react";
import {
    TextArea as BaseTextArea,
    TextAreaHandledProps as BaseTextAreaHandledProps,
    TextAreaProps as BaseTextAreaProps,
    TextAreaClassNameContract,
    TextAreaManagedClasses,
    TextAreaUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    textAreaDependencies,
} from "@microsoft/fast-components-styles-msft";
import TextAreaStyles from "@microsoft/fast-components-styles-msft/css/text-area.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import textAreaSchema from "./text-area.schema";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const TextArea = manageJss()(
    withCSSCustomProperties(...textAreaDependencies)(
        MergeManagedClasses(BaseTextArea, TextAreaStyles)
    )
);
type TextArea = InstanceType<typeof TextArea>;

type TextAreaHandledProps = Subtract<BaseTextAreaHandledProps, TextAreaManagedClasses>;
type TextAreaProps = ManagedJSSProps<
    BaseTextAreaProps,
    TextAreaClassNameContract,
    DesignSystem
>;

export {
    TextAreaClassNameContract,
    TextAreaHandledProps,
    TextAreaUnhandledProps,
    TextArea,
    TextAreaProps,
    textAreaSchema,
};
