import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { MetatextClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { DesignSystem } from "../../design-system";
import { neutralForegroundHintCustomProperty } from "../../utilities/color";

const styles: ComponentStyles<MetatextClassNameContract, DesignSystem> = {
    metatext: {
        color: neutralForegroundHintCustomProperty,
    },
};

export default styles;
