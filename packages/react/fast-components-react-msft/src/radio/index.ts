import React from "react";
import {
    Radio as BaseRadio,
    RadioHandledProps as BaseRadioHandledProps,
    RadioProps as BaseRadioProps,
    RadioClassNameContract,
    RadioManagedClasses,
    RadioSlot,
    RadioUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { DesignSystem, radioDependencies } from "@microsoft/fast-components-styles-msft";
import RadioStyles from "@microsoft/fast-components-styles-msft/css/radio.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import radioSchema from "./radio.schema";
import radioSchema2 from "./radio.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Radio = manageJss()(
    withCSSCustomProperties(...radioDependencies)(
        MergeManagedClasses(BaseRadio, RadioStyles)
    )
);
type Radio = InstanceType<typeof Radio>;

type RadioHandledProps = Subtract<BaseRadioHandledProps, RadioManagedClasses>;
type RadioProps = ManagedJSSProps<BaseRadioProps, RadioClassNameContract, DesignSystem>;

export {
    Radio,
    RadioClassNameContract,
    RadioHandledProps,
    RadioUnhandledProps,
    RadioProps,
    radioSchema,
    radioSchema2,
    RadioSlot,
};
