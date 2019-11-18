import React from "react";
import {
    ManagedClasses,
    ViewportVirtualizerClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export interface ViewportVirtualizerManagedClasses
    extends ManagedClasses<ViewportVirtualizerClassNameContract> {}
export interface ViewportVirtualizerUnhandledProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export interface ViewportVirtualizerHandledProps
    extends ViewportVirtualizerManagedClasses {
    /**
     *  Ref to the viewport the positioner is constrained to
     */
    viewport?: React.RefObject<any> | HTMLElement;

    /**
     * The children of the viewport positioner
     */
    children?: React.ReactNode;

    /**
     * The disabled state
     */
    disabled?: boolean;
}

export type ViewportVirtualizerProps = ViewportVirtualizerHandledProps &
    ViewportVirtualizerUnhandledProps;
