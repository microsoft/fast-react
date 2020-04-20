import React from "react";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { SliderLabelClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    DesignSystem,
    sliderLabelDependencies,
} from "@microsoft/fast-components-styles-msft";
import SliderLabelStyles from "@microsoft/fast-components-styles-msft/css/slider-label.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import sliderLabelSchema from "./slider-label.schema";
import sliderLabelSchema2 from "./slider-label.schema.2";
import MSFTSliderLabel, {
    SliderLabelHandledProps as MSFTSliderLabelHandledProps,
    SliderLabelProps as MSFTSliderLabelProps,
    SliderLabelManagedClasses,
    SliderLabelUnhandledProps,
} from "./slider-label";

const SliderLabel = manageJss()(
    withCSSCustomProperties(...sliderLabelDependencies)(
        MergeManagedClasses(MSFTSliderLabel, SliderLabelStyles)
    )
);
type SliderLabel = InstanceType<typeof SliderLabel>;

type SliderLabelHandledProps = Subtract<
    MSFTSliderLabelHandledProps,
    SliderLabelManagedClasses
>;
type SliderLabelProps = ManagedJSSProps<
    MSFTSliderLabelProps,
    SliderLabelClassNameContract,
    DesignSystem
>;

export {
    SliderLabel,
    SliderLabelProps,
    SliderLabelClassNameContract,
    SliderLabelHandledProps,
    sliderLabelSchema,
    sliderLabelSchema2,
    SliderLabelUnhandledProps,
};
