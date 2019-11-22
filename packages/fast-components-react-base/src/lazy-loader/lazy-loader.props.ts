import React from "react";
import {
    ManagedClasses,
    LazyLoaderClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export enum LazyLoaderMode {
    onlyCSS = "onlyCSS",
    lazyLoad = "lazyLoad",
    unloadWhenOutOfView = "unloadWhenOutOfView",
}

export interface LazyLoaderManagedClasses
    extends ManagedClasses<LazyLoaderClassNameContract> {}
export interface LazyLoaderUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface LazyLoaderHandledProps extends LazyLoaderManagedClasses {
    /**
     *  Ref to the viewport the positioner is constrained to
     */
    viewport?: React.RefObject<any> | HTMLElement;

    /**
     * The children of the viewport positioner
     */
    children?: React.ReactNode;

    /**
     * The current mode
     */
    lazyLoaderMode?: LazyLoaderMode;

    /**
     * The onVisibilityChangeEvent handler
     */
    onVisibilityChange?: (isInView: boolean) => void;

    /**
     * Margin used to expand/shrink viewport
     * corresponds to IntersectionObserver rootmargin option value
     */
    rootMargin?: string;

    /**
     * corresponds to IntersectionObserver threshold option value
     */
    threshold?: number[];
}

export type LazyLoaderProps = LazyLoaderHandledProps & LazyLoaderUnhandledProps;
