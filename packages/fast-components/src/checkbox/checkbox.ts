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

    // Not sure exaclty what these do so we might omit for now
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
    @attr({ attribute: "formaction" })
    public formAction: string;
    @attr({ attribute: "formenctype" })
    public formEncType: string;
    @attr({ attribute: "formmethod" })
    public formMethod: string;
    @attr({ attribute: "formnovalidate" })
    public formNoValidate: boolean;
    @attr({ attribute: "formtarget" })
    public fromTarget: string;

    @attr
    public name: string; // Map to proxy element
    @attr
    public disabled: boolean; // Map to proxy element

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
    @attr
    public value: string; // Map to proxy element. Should maybe invoke setformValue? I think for this it should likely be the checked property but not sure

    /**
     * Provides the default checkedness of the input element
     * Passed down to proxy
     */
    @attr({ attribute: "checked" })
    public checkedAttribute: string | null = null; // Test - does this reflect?

    /**
     * Initialized to the value of the checked attribute. Can be changed independently of the "checked" attribute,
     * but changing the "checked" attribute always additionally sets this value.
     */
    public defaultChecked: boolean;

    /**
     * The checked state of the control
     */
    @observable
    public checked: boolean;

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

        // Lets see if there is a better way to abstract this relationship, becuase this should always return
        // this.checkedAttribute unless it is set explicitly. When set explicitly, it will retain that value
        // until explicitly change *or* the `checked` attribute is changed
        this.defaultChecked = !!this.checkedAttribute;
        this.checked = this.defaultChecked;
    }

    connectedCallback() {
        if (this.autofocus) {
            this.focus();
        }
    }
}
