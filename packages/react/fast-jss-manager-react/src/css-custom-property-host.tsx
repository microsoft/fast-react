import React from "react";


interface CSSCustomPropertyDefinition {
    name: string;
    value: string | ((...args: any[]) => string);
}

type CSSCustomPropertyRegisterFunction = (definition: CSSCustomPropertyDefinition) => void;

function err(): void {
    throw new Error("No CSSCustomPropertyHost component was found. Wrap dependent experiences in a <CSSCustomPropertyHost> component").
}

export interface CSSCustomPropertyHostContext {
    register: CSSCustomPropertyRegisterFunction;
    unregister: CSSCustomPropertyRegisterFunction;
}

export const cssCustomPropertyContext = React.createContext<CSSCustomPropertyHostContext>({
    register: err,
    unregister: err
});


interface CSSCustomPropertyHostProps<T> {
    designSystem: T;
}


export class CSSCustomPropertyHost<T> extends React.Component<CSSCustomPropertyHostProps<T>> {
    private definitions = {};
    private host = React.createRef<HTMLDivElement>();

    private register = (definition: CSSCustomPropertyDefinition) => {
        if (!this.definitions[definition.name]) {
            this.definitions[definition.name] = definition;

            // Write d
        }
    }

    private unregister = (definition: CSSCustomPropertyDefinition) => {

    }

    private writeCustomProperty(definition): void {
        const hostel = this.host.current;
        if (hostel) {
            hostel.style.setProperty
        }
    }

    public render() {
        return (
            <div ref={this.host}>
                {/* <cssCustomPropertyContext.Provider>
        
                </cssCustomPropertyContext.Provider> */}
            </div>
        )    
    }


}