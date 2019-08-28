import React from "react";
import { Subtract } from "utility-types";
import {
    TabsHandledProps as BaseTabsHandledProps,
    TabsItem,
    TabsManagedClasses as BaseTabsManagedClasses,
    TabsUnhandledProps as BaseTabsUnhandledProps,
} from "@microsoft/fast-components-react-base";
import {
    ManagedClasses,
    PivotClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";

export interface PivotBaseManagedClasses extends ManagedClasses<PivotClassNameContract> {}
export interface PivotBaseHandledProps
    extends PivotBaseManagedClasses,
        Subtract<BaseTabsHandledProps, BaseTabsManagedClasses> {
    /**
     * Items that will make up the pivot and pivot content
     */
    items: TabsItem[];
}

/* tslint:disable-next-line:no-empty-interface */
export interface PivotBaseUnhandledProps extends BaseTabsUnhandledProps {}
export type PivotBaseProps = PivotBaseHandledProps & PivotBaseUnhandledProps;
