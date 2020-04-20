import React from "react";
import {
    Card as BaseCard,
    CardHandledProps as BaseCardHandledProps,
    CardProps as BaseCardProps,
    CardClassNameContract,
    CardManagedClasses,
    CardTag,
    CardUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import CardStyles from "@microsoft/fast-components-styles-msft/css/card.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import cardSchema from "./card.schema";
import cardSchema2 from "./card.schema.2";

const Card = manageJss()(MergeManagedClasses(BaseCard, CardStyles));
type Card = InstanceType<typeof Card>;

type CardHandledProps = Subtract<BaseCardHandledProps, CardManagedClasses>;
type CardProps = ManagedJSSProps<BaseCardProps, CardClassNameContract, DesignSystem>;

export {
    Card,
    CardProps,
    CardTag,
    CardClassNameContract,
    CardHandledProps,
    cardSchema,
    cardSchema2,
    CardUnhandledProps,
};
