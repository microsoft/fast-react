import React, { useCallback, useContext, useLayoutEffect } from "react";
import { timingSafeEqual } from "crypto";

interface CSSCustomPropertyDefinition {
    name: string;
    value: string | ((...args: any[]) => string);
}

type CSSCustomPropertyRegisterFunction = (
    definition: CSSCustomPropertyDefinition
) => void;

function err(): void {
    throw new Error(
        "No CSSCustomPropertyHost component was found. Wrap dependent experiences in a <CSSCustomPropertyHost> component"
    );
}

export interface CSSCustomPropertyHostContext {
    register: CSSCustomPropertyRegisterFunction;
    unregister: CSSCustomPropertyRegisterFunction;
}

export const cssCustomPropertyContext = React.createContext<CSSCustomPropertyHostContext>(
    {
        register: err,
        unregister: err,
    }
);

interface CSSCustomPropertyHostProps<T> {
    designSystem: T;
}

/* eslint-disable */
export function withCSSCustomProperties(...properties: CSSCustomPropertyDefinition[]) {
    return (component: React.ComponentClass | React.FunctionComponent) => {
        return (props: any): React.ReactElement => {
            const context = useContext(cssCustomPropertyContext);

            useLayoutEffect(() => {
                properties.forEach(context.register);

                return () => {
                    properties.forEach(context.unregister);
                };
            }, []);

            return React.createElement(component, props);
        };
    };
}
/* eslint-enable */

export class CSSCustomPropertyHost<T> extends React.Component<
    CSSCustomPropertyHostProps<T>
> {
    private definitions: {
        [key: string]: CSSCustomPropertyDefinition & { count: number };
    } = {};
    private host: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    private register = (definition: CSSCustomPropertyDefinition): void => {
        const def = this.definitions[definition.name];

        if (!def) {
            this.definitions[definition.name] = { ...definition, count: 1 };
            this.writeCustomProperty(definition);
        } else {
            def.count += 1;
        }
    };

    private unregister = (definition: CSSCustomPropertyDefinition): void => {
        const def = this.definitions[definition.name];

        if (def) {
            if (def.count === 1) {
                delete this.definitions[definition.name];
                this.host.current.style.removeProperty(definition.name);
            } else {
                def.count -= 1;
            }
        }
    };

    private writeCustomProperty = (definition: CSSCustomPropertyDefinition): void => {
        const hostEl = this.host.current;

        if (hostEl) {
            hostEl.style.setProperty(
                `--${definition.name}`,
                typeof definition.value === "function"
                    ? definition.value(this.props.designSystem)
                    : definition.value
            );
        }
    };

    public render(): React.ReactNode {
        return (
            <div ref={this.host}>
                <cssCustomPropertyContext.Provider
                    value={{ register: this.register, unregister: this.unregister }}
                >
                    {this.props.children}
                </cssCustomPropertyContext.Provider>
            </div>
        );
    }

    /**
     * componentDidUpdate
     */
    public componentDidUpdate(prev: CSSCustomPropertyHostProps<T>): void {
        if (this.props.designSystem !== prev.designSystem) {
            Object.values(this.definitions).forEach(this.writeCustomProperty);
        }
    }
}
