import React from "react";
import MSFTSliderLabel, {
    SliderLabelHandledProps as MSFTSliderLabelHandledProps,
    SliderLabelManagedClasses,
    SliderLabelProps as MSFTSliderLabelProps,
    SliderLabelUnhandledProps,
} from "./slider-label";
import sliderLabelSchema from "./slider-label.schema";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { SliderLabelClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { DesignSystem, SliderLabelStyles } from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import { sliderLabelSheetIndex } from "../stylesheet-order";

/* tslint:disable-next-line:typedef */
const SliderLabel = manageJss(SliderLabelStyles, { index: sliderLabelSheetIndex })(
    MSFTSliderLabel
);
type SliderLabel = InstanceType<typeof SliderLabel>;

interface SliderLabelHandledProps
    extends Subtract<MSFTSliderLabelHandledProps, SliderLabelManagedClasses> {}
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
    SliderLabelUnhandledProps,
};
