import { LazyLoaderClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import { canUseDOM } from "exenv-es6";
import { get, isNil } from "lodash-es";
import React from "react";
import ReactDOM from "react-dom";
import { DisplayNamePrefix, IntersectionObserverEntry } from "../utilities";
import {
    LazyLoaderHandledProps,
    LazyLoaderMode,
    LazyLoaderProps,
    LazyLoaderUnhandledProps,
} from "./lazy-loader.props";
import {
    ViewportContext,
    ViewportContextType,
} from "../viewport-positioner/viewport-context";

export interface LazyLoaderState {
    disabled: boolean;
    validRefChecksRemaining: number;
    hasLoaded: boolean;
    isInview: boolean;
}

class LazyLoader extends Foundation<
    LazyLoaderHandledProps,
    LazyLoaderUnhandledProps,
    LazyLoaderState
> {
    public static displayName: string = `${DisplayNamePrefix}LazyLoader`;

    public static contextType: React.Context<ViewportContextType> = ViewportContext;

    public static defaultProps: Partial<LazyLoaderProps> = {
        managedClasses: {},
        lazyLoaderMode: LazyLoaderMode.lazyLoad,
        rootMargin: "100px 100px 100px 100px",
        threshold: [0],
    };

    protected handledProps: HandledProps<LazyLoaderHandledProps> = {
        managedClasses: void 0,
        viewport: void 0,
        onVisibilityChange: void 0,
        lazyLoaderMode: void 0,
        rootMargin: void 0,
        threshold: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private openRequestAnimationFrame: number = null;
    private collisionDetector: IntersectionObserver;
    private isInView: boolean = false;
    private hasRenderedInternals = false;

    /**
     * constructor
     */
    constructor(props: LazyLoaderProps) {
        super(props);

        this.state = {
            hasLoaded: false,
            isInview: false,
            disabled: false,
            validRefChecksRemaining: 2,
        };
    }

    public componentDidMount(): void {
        this.updateDisabledState();
    }

    public componentWillUnmount(): void {
        this.disable();
    }

    public componentDidUpdate(prevProps: LazyLoaderProps): void {
        if (this.state.validRefChecksRemaining > 0) {
            this.updateDisabledState();
        }
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                className={this.generateClassNames()}
            >
                {this.renderChildren()}
            </div>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        const {
            lazyLoader,
            lazyLoader__isInView,
        }: LazyLoaderClassNameContract = this.props.managedClasses;

        return super.generateClassNames(
            classNames(lazyLoader, [lazyLoader__isInView, this.state.isInview])
        );
    }

    /**
     *  Checks whether component should render internals
     */
    private shouldRenderInternals = (): boolean => {
        if (
            this.state.disabled ||
            this.props.lazyLoaderMode === LazyLoaderMode.onlyCSS ||
            (this.state.isInview &&
                this.props.lazyLoaderMode === LazyLoaderMode.lazyLoad) ||
            (this.state.isInview &&
                this.props.lazyLoaderMode === LazyLoaderMode.unloadWhenOutOfView) ||
            (this.props.lazyLoaderMode === LazyLoaderMode.lazyLoad &&
                this.hasRenderedInternals)
        ) {
            return true;
        }
        return false;
    };

    /**
     * Render childrend
     */
    private renderChildren(): React.ReactNode {
        if (this.shouldRenderInternals()) {
            this.hasRenderedInternals = true;
            return this.props.children;
        }
        return null;
    }

    /**
     *  Checks whether component should be disabled or not
     */
    private updateDisabledState = (): void => {
        if (!canUseDOM()) {
            this.disable();
            return;
        }

        if (this.getViewportElement() === null) {
            if (this.state.validRefChecksRemaining > 0) {
                this.setState({
                    validRefChecksRemaining: this.state.validRefChecksRemaining - 1,
                });
                return;
            }
        }

        this.enableComponent();
    };

    /**
     *  Enable the component
     */
    private enableComponent = (): void => {
        const viewportElement: HTMLElement | null = this.getViewportElement();

        if (isNil(viewportElement) || isNil(this.rootElement.current)) {
            return;
        }

        if (!(window as WindowWithIntersectionObserver).IntersectionObserver) {
            this.disable();
            return;
        }

        this.setState({
            disabled: false,
            validRefChecksRemaining: 0,
        });

        if (!isNil(this.collisionDetector)) {
            return;
        }

        this.collisionDetector = new (window as WindowWithIntersectionObserver).IntersectionObserver(
            this.handleCollision,
            {
                root: viewportElement,
                rootMargin: this.props.rootMargin,
                threshold: this.props.threshold,
            }
        );
        this.collisionDetector.observe(this.rootElement.current);
    };

    /**
     *  Disable the component
     */
    private disable = (): void => {
        if (this.state.disabled) {
            return;
        }
        this.setState({
            disabled: true,
            validRefChecksRemaining: 0,
        });

        if (
            this.collisionDetector &&
            typeof this.collisionDetector.disconnect === "function"
        ) {
            this.collisionDetector.unobserve(this.rootElement.current);
            this.collisionDetector.disconnect();
            this.collisionDetector = null;
        }
    };

    /**
     *  Handle collisions
     */
    private handleCollision = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
    ): void => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.target === this.rootElement.current) {
                const inView: boolean = entry.intersectionRatio > 0;
                if (this.isInView !== inView) {
                    this.isInView = inView;
                    this.requestFrame();
                }
            }
        });
    };

    /**
     * Request's an animation frame if there are currently no open animation frame requests
     */
    private requestFrame = (): void => {
        if (this.openRequestAnimationFrame === null) {
            this.openRequestAnimationFrame = window.requestAnimationFrame(
                this.updateVisibility
            );
        }
    };

    private updateVisibility = (): void => {
        this.openRequestAnimationFrame = null;
        this.setState({
            isInview: this.isInView,
        });
    };

    /**
     * get the viewport element, prefer one provided in props, then context, then document root
     */
    private getViewportElement = (): HTMLElement | null => {
        if (!isNil(this.props.viewport)) {
            if (this.props.viewport instanceof HTMLElement) {
                return this.props.viewport;
            } else {
                return this.extractElementFromRef(this.props.viewport);
            }
        }

        if (!isNil(this.context.viewport)) {
            if (this.context.viewport instanceof HTMLElement) {
                return this.context.viewport;
            } else {
                return this.extractElementFromRef(this.context.viewport);
            }
        }

        if (document.scrollingElement instanceof HTMLElement) {
            return document.scrollingElement as HTMLElement;
        }
        return null;
    };

    /**
     * returns an html element from a ref
     */
    private extractElementFromRef = (
        sourceRef: React.RefObject<any>
    ): HTMLElement | null => {
        if (!isNil(sourceRef.current)) {
            if (sourceRef.current instanceof HTMLElement) {
                return sourceRef.current;
            }

            const foundNode: Element | Text | null = ReactDOM.findDOMNode(
                sourceRef.current
            );

            if (foundNode instanceof HTMLElement) {
                return foundNode;
            }
        }

        return null;
    };
}
LazyLoader.contextType = ViewportContext;
export default LazyLoader;
export * from "./lazy-loader.props";
export { LazyLoaderClassNameContract, ViewportContext, ViewportContextType };
