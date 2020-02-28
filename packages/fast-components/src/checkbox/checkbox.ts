import { attr, FastElement, observable } from "@microsoft/fast-element";
// import { ElementInternals, ValidityStateFlags } from "../types";
/* tslint:disable */

/**
 * Form connected components design.
 *
 * Decorators cannot change a class type in typescript currently, meaning
 * if we try to implement formConnection as a decorator, all of the properties
 * will appear to TypeScript to not exist. https://stackoverflow.com/questions/54813329/adding-properties-to-a-class-via-decorators-in-typescript
 *
 * For this reason, I'm implementing these as base-classes.
 *
 * form elements:
 * - button
 * - --datalist // This is a set of suggestions which doesn't affect the form input value, so this isn't necessary
 * - fieldset
 * - input
 *  - --button // MDN recommends to use the button element, so passing "button" should just create a button
 *  - checkbox
 *  - color
 *  - date
 *  - datetime-local
 *  - email
 *  - file
 *  - --hidden // I don't think there is a valid use-case for a hidden custom element
 *  - image
 *  - month
 *  - number
 *  - password
 *  - radio
 *  - range
 *  - reset  // How will this work when we form-connect a component like fast-button but an instance needs reset?
 *  - search
 *  - submit // How will this work when we form-connect a component like fast-button but an instance needs submit?
 *  - tel
 *  - text
 *  - time
 *  - url
 *  - week
 * - keygen
 * - label
 * - legend
 * - meter
 * - --optgroup // This just groups options - no need to surface
 * - --option // relative to select, no need to surface
 * - --output // this isn't a user input so I don't think we need it
 * - --progress // I don't think this is a valid case
 * - select
 * - textarea
 */

function constructExternals(element: HTMLInputElement): ElementInternals {
    return {
        get form() {
            return element.form;
        },
        get labels() {
            return element.labels as any; // Inconsistent typing, not sure why
        },
        get validity(): ValidityState {
            return element.validity;
        },
        get willValidate(): boolean {
            return element.willValidate;
        },
        get validationMessage(): string {
            return element.validationMessage;
        },
    };
}

function formAssociated<T extends { new (...args: any[]): {} }>(constructor: T) {
    class FromAssociated extends constructor implements ElementInternals {
        public static get formAssociated(): boolean {
            return "ElementInternals" in window;
        }

        /**
         * Returns a reference to the parent form. Returns null if there  is no parent form
         */
        public get form(): HTMLFormElement | null {
            return this.elementInternals.form;
        }

        public get labels(): NodeList {
            return this.elementInternals.labels;
        }

        public get validity(): ValidityState {
            return this.elementInternals.validity;
        }

        public get willValidate(): boolean {
            return this.elementInternals.willValidate;
        }

        public get validationMessage(): string {
            return this.elementInternals.validationMessage;
        }

        /**
         * implementation of element internals
         */
        private elementInternals: ElementInternals;

        private proxy: HTMLInputElement;
        constructor(...args: any[]) {
            super(...args);

            if (typeof (this as any).attachInternals === "function") {
                this.elementInternals = (this as any).attachInternals();
            } else {
                this.proxy = document.createElement("input");
                this.proxy.setAttribute("type", "checkbox"); // TODO

                if (this instanceof HTMLElement) {
                    this.appendChild(this.proxy);

                    this.elementInternals = constructExternals(this.proxy);
                }
            }
        }

        public setValidity(
            flags: ValidityStateFlags,
            message?: string,
            anchor?: HTMLElement
        ): void {
            this.elementInternals.setValidity(flags, message, anchor as any);
        }
        public reportValidity(): boolean {
            return this.elementInternals.reportValidity();
        }

        public checkValidity(): boolean {
            return this.elementInternals.checkValidity();
        }

        public setFormValue(
            value: File | string | FormData,
            state: File | string | FormData
        ): void {
            this.elementInternals.setFormValue(value, state);
        }
    }

    return FromAssociated;
}

export interface Checkbox extends ElementInternals {}

@formAssociated
export class Checkbox extends FastElement {
    connectedCallback() {
        console.log("this.form", this.form);
        console.log("this.labels", this.labels);
    }
}
