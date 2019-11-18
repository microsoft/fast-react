import { ViewportVirtualizerClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import { canUseDOM } from "exenv-es6";
import { get, isNil } from "lodash-es";
import React from "react";
import ReactDOM from "react-dom";
import { DisplayNamePrefix, IntersectionObserverEntry } from "../utilities";
import {
    ViewportVirtualizerHandledProps,
    ViewportVirtualizerProps,
    ViewportVirtualizerUnhandledProps,
} from "./viewport-virtualizer.props";
import {
    ViewportContext,
    ViewportContextType,
} from "../viewport-positioner/viewport-context";

export interface ViewportVirtualizerState {
    disabled: boolean;
    validRefChecksRemaining: number;
    isInview: boolean;
}

class ViewportVirtualizer extends Foundation<
    ViewportVirtualizerHandledProps,
    ViewportVirtualizerUnhandledProps,
    ViewportVirtualizerState
> {
    public static displayName: string = `${DisplayNamePrefix}ViewportVirtualizer`;

    public static contextType: React.Context<ViewportContextType> = ViewportContext;

    public static defaultProps: Partial<ViewportVirtualizerProps> = {
        managedClasses: {},
    };

    protected handledProps: HandledProps<ViewportVirtualizerHandledProps> = {
        managedClasses: void 0,
        viewport: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private openRequestAnimationFrame: number = null;

    private collisionDetector: IntersectionObserver;

    /**
     * constructor
     */
    constructor(props: ViewportVirtualizerProps) {
        super(props);

        this.state = {
            isInview: false,
            disabled: isNil(this.props.disabled) ? false : this.props.disabled,
            validRefChecksRemaining: 2,
        };
    }

    public componentDidMount(): void {
        this.updateDisabledState();
    }

    public componentWillUnmount(): void {
        this.disable();
    }

    public componentDidUpdate(prevProps: ViewportVirtualizerProps): void {
        if (
            prevProps.disabled !== this.props.disabled ||
            this.state.validRefChecksRemaining > 0
        ) {
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
                {this.state.isInview || this.state.disabled ? this.props.children : null}
            </div>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        const {
            viewportVirtualizer,
        }: ViewportVirtualizerClassNameContract = this.props.managedClasses;

        return super.generateClassNames(classNames(viewportVirtualizer));
    }

    /**
     *  Checks whether component should be disabled or not
     */
    private updateDisabledState = (): void => {
        if (!canUseDOM() || this.props.disabled === true) {
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

        if (
            this.props.disabled ||
            isNil(viewportElement) ||
            isNil(this.rootElement.current)
        ) {
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
                rootMargin: "0px",
                threshold: [0, 1],
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
                this.setState({
                    isInview: entry.intersectionRatio > 0 ? true : false,
                });
            }
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
ViewportVirtualizer.contextType = ViewportContext;
export default ViewportVirtualizer;
export * from "./viewport-virtualizer.props";
export { ViewportVirtualizerClassNameContract, ViewportContext, ViewportContextType };
