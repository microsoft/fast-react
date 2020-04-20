import React from "react";
import { SliderClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { DesignSystem, sliderDependencies } from "@microsoft/fast-components-styles-msft";
import SliderStyles from "@microsoft/fast-components-styles-msft/css/slider.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import MSFTSlider, {
    SliderHandledProps as MSFTSliderHandledProps,
    SliderProps as MSFTSliderProps,
    SliderManagedClasses,
    SliderUnhandledProps,
} from "./slider";
import sliderSchema from "./slider.schema";
import sliderSchema2 from "./slider.schema.2";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Slider = manageJss()(
    withCSSCustomProperties(...sliderDependencies)(
        MergeManagedClasses(MSFTSlider, SliderStyles)
    )
);
type Slider = InstanceType<typeof Slider>;

type SliderHandledProps = Subtract<MSFTSliderHandledProps, SliderManagedClasses>;
type SliderProps = ManagedJSSProps<
    MSFTSliderProps,
    SliderClassNameContract,
    DesignSystem
>;

export {
    Slider,
    SliderProps,
    SliderClassNameContract,
    SliderHandledProps,
    sliderSchema,
    sliderSchema2,
    SliderUnhandledProps,
};
