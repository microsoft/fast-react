import { attr, FastElement, observable, Observable } from "@microsoft/fast-element";
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

// function constructExternals(element: HTMLInputElement): ElementInternals {
//     return {
//         get form() {
//             return element.form;
//         },
//         get labels() {
//             return element.labels as any; // Inconsistent typing, not sure why
//         },
//         get validity(): ValidityState {
//             return element.validity;
//         },
//         get willValidate(): boolean {
//             return element.willValidate;
//         },
//         get validationMessage(): string {
//             return element.validationMessage;
//         },
//     };
// }

// function formAssociated<T extends { new (...args: any[]): {} }>(constructor: T) {
//     class FromAssociated extends constructor implements ElementInternals {
//         public static get formAssociated(): boolean {
//             return "ElementInternals" in window;
//         }

//         /**
//          * Returns a reference to the parent form. Returns null if there  is no parent form
//          */
//         public get form(): HTMLFormElement | null {
//             return this.elementInternals.form;
//         }

//         public get labels(): NodeList {
//             return this.elementInternals.labels;
//         }

//         public get validity(): ValidityState {
//             return this.elementInternals.validity;
//         }

//         public get willValidate(): boolean {
//             return this.elementInternals.willValidate;
//         }

//         public get validationMessage(): string {
//             return this.elementInternals.validationMessage;
//         }

//         /**
//          * implementation of element internals
//          */
//         private elementInternals: ElementInternals;

//         private proxy: HTMLInputElement;
//         constructor(...args: any[]) {
//             super(...args);

//             if (typeof (this as any).attachInternals === "function") {
//                 this.elementInternals = (this as any).attachInternals();
//             } else {
//                 this.proxy = document.createElement("input");
//                 this.proxy.setAttribute("type", "checkbox"); // TODO

//                 if (this instanceof HTMLElement) {
//                     this.appendChild(this.proxy);

//                     this.elementInternals = constructExternals(this.proxy);
//                 }
//             }
//         }

//         public setValidity(
//             flags: ValidityStateFlags,
//             message?: string,
//             anchor?: HTMLElement
//         ): void {
//             this.elementInternals.setValidity(flags, message, anchor as any);
//         }
//         public reportValidity(): boolean {
//             return this.elementInternals.reportValidity();
//         }

//         public checkValidity(): boolean {
//             return this.elementInternals.checkValidity();
//         }

//         public setFormValue(
//             value: File | string | FormData,
//             state: File | string | FormData
//         ): void {
//             this.elementInternals.setFormValue(value, state);
//         }
//     }

//     return FromAssociated;
// }

// export interface Checkbox extends ElementInternals {}

// @formAssociated

export class Checkbox extends FastElement {
    public static get formAssociated(): boolean {
        return "ElementInternals" in window;
    }

    private elementInternals: ElementInternals;
    private proxy: HTMLInputElement;

    /**
     * Properties related to the parent form
     */
    public get form(): HTMLElement | null {
        return Checkbox.formAssociated ? this.elementInternals.form : this.proxy.form;
    }

    @attr
    public name: string; // Map to proxy element

    @attr
    public disabled: boolean; // Map to proxy element

    @attr
    public readonly: boolean; // Map to proxy element

    /**
     * Focus element when connected. (can we encapsulate this in a @autofocus?)
     */
    @attr
    public autofocus: boolean;

    /**
     * Require the field prior to form submission
     */
    @attr
    public required: boolean; // Map to proxy element. Should work automatically with ElementInternals

    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     */
    @attr
    public value: string = "on"; // Map to proxy element.

    /**
     * Tracks whether the "checked" property has been changed.
     * This is necessary to provide consistent behavior with
     * normal input checkboxes
     */
    private dirtyChecked: boolean = false;

    /**
     * Set to true when the component has constructed
     */
    constructed: boolean = false;

    /**
     * Provides the default checkedness of the input element
     * Passed down to proxy
     */
    @attr({ attribute: "checked" })
    public checkedAttribute: string | null;
    private checkedAttributeChanged(): void {
        this.defaultChecked = typeof this.checkedAttribute === "string";
    }

    /**
     * Initialized to the value of the checked attribute. Can be changed independently of the "checked" attribute,
     * but changing the "checked" attribute always additionally sets this value.
     */
    @observable
    public defaultChecked: boolean = !!this.checkedAttribute;
    private defaultCheckedChanged(): void {
        if (!this.dirtyChecked) {
            // Setting this.checked will cause us to enter a dirty state,
            // but if we are clean when defaultChecked is changed, we want to stay
            // in a clean state, so reset this.dirtyChecked
            this.checked = this.defaultChecked;
            this.dirtyChecked = false;
        }
    }

    /**
     * The checked state of the control
     */
    @observable
    public checked: boolean = this.defaultChecked;
    private checkedChanged(): void {
        if (!this.dirtyChecked) {
            this.dirtyChecked = true;
        }

        this.setFormValue();

        if (this.constructed) {
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
        }
    }

    /**
     * The indeterminate state of the control
     */
    @observable
    public indeterminate: boolean = false;

    public get validity(): ValidityState {
        return Checkbox.formAssociated
            ? this.elementInternals.validity
            : this.proxy.validity;
    }

    public get validationMessage(): string {
        return Checkbox.formAssociated
            ? this.elementInternals.validationMessage
            : this.proxy.validationMessage;
    }

    public get willValidate(): boolean {
        return Checkbox.formAssociated
            ? this.elementInternals.willValidate
            : this.proxy.willValidate;
    }

    constructor() {
        super();

        if (Checkbox.formAssociated) {
            this.elementInternals = (this as any).attachInternals();
        } else {
            this.proxy = document.createElement("input");
            this.proxy.setAttribute("type", "checkbox");
            this.proxy.style.display = "none";

            this.appendChild(this.proxy);
        }

        this.constructed = true;
    }

    private setFormValue(): void {
        if (this.elementInternals) {
            this.checked
                ? this.elementInternals.setFormValue(this.value)
                : // While the API doesn't claim to support null, passing null
                  // removes the field from the submission data which is the
                  // native behavior of an input[type="checkbox"]
                  this.elementInternals.setFormValue(null as any);
        }
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.autofocus) {
            this.focus();
        }

        this.setFormValue();
    }
}
