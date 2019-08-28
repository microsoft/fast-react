import React from "react";
import { Subtract } from "utility-types";
import {
    TabsItem,
} from "@microsoft/fast-components-react-base";
import {
    PivotBaseManagedClasses,
    PivotBaseHandledProps,
    PivotBaseUnhandledProps
} from "../pivot-base"
import {
    ManagedClasses,
    PivotClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";

export interface PivotManagedClasses extends PivotBaseManagedClasses {}
export interface PivotHandledProps 
    extends PivotManagedClasses,
    Subtract<PivotBaseHandledProps, PivotBaseManagedClasses> {}

/* tslint:disable-next-line:no-empty-interface */
export interface PivotUnhandledProps extends PivotBaseUnhandledProps {}
export type PivotProps = PivotHandledProps & PivotUnhandledProps;
