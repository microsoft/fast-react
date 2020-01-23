import { ControlTemplateUtilitiesProps, StandardControlPlugin } from "./templates";
import {
    FormAttributeSettingsMappingToPropertyNames,
    FormChildOptionItem,
} from "./form.props";
import { Controls } from "./form-section.props";
import { Omit } from "utility-types";

export interface FormControlSwitchProps
    extends Omit<ControlTemplateUtilitiesProps, "component"> {
    /**
     * The name of the property
     */
    propertyName: string;

    /**
     * Control plugins
     */
    controls: Controls;

    /**
     * The custom control plugins which will be used
     * instead of the default control plugins
     */
    controlPlugins?: StandardControlPlugin[];

    /**
     * A component dictionary to be used by type
     */
    controlComponents: { [key: string]: React.ComponentClass | React.FunctionComponent };

    /**
     * The schema to be used
     */
    schema: any;

    /**
     * The untitled string for missing titles
     */
    untitled: string;

    /**
     * The schema location (lodash path syntax)
     */
    schemaLocation: string;

    /**
     * The possible child options
     */
    childOptions: FormChildOptionItem[];

    /**
     * The additional attributes mapped to a property name
     */
    attributeSettingsMappingToPropertyNames?: FormAttributeSettingsMappingToPropertyNames;

    /**
     * Opt out of generating data that would be valid in the form
     * which means some selections through the UI (such as selecting a oneOf)
     * may create invalid data and validation errors.
     */
    allowInvalidSelection: boolean;

    /**
     * Allow soft remove
     * defaults to true
     */
    softRemove?: boolean;
}
