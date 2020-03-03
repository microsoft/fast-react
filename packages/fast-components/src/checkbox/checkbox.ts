import { attr, FastElement, observable, Observable } from "@microsoft/fast-element";
/* tslint:disable */
export abstract class FormAssociated extends FastElement {
    /**
     * Form associated
     */
    public static get formAssociated(): boolean {
        return "ElementInternals" in window;
    }

    public get validity(): ValidityState {
        return Checkbox.formAssociated
            ? this.elementInternals.validity
            : this.proxy.validity;
    }

    /**
     * Properties related to the parent form
     */
    public get form(): HTMLFormElement | null {
        return Checkbox.formAssociated ? this.elementInternals.form : this.proxy.form;
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

    /**
     * Typically the `labels` property evaluates to a NodeList,
     * however in cases where we impelment a proxy element,
     * we need to construct the labels set. A NodeList can not
     * be constructed by JavaScript so we standardize on an
     * Array of nodes instead.
     */
    public get labels(): Node[] {
        if (Checkbox.formAssociated) {
            return Array.from(this.elementInternals.labels);
        } else if (
            this.proxy instanceof HTMLElement &&
            this.proxy.ownerDocument &&
            this.id
        ) {
            // Labels associated by wraping the element: <label><custom-element></custom-element></label>
            const parentLabels = this.proxy.labels;
            // Labels associated using the `for` attribute
            const forLabels = Array.from(
                this.proxy.ownerDocument.querySelectorAll(`[for='${this.id}']`)
            );

            return !!parentLabels
                ? forLabels.concat(Array.from(parentLabels))
                : forLabels;
        } else {
            return [];
        }
    }

    @attr
    public id: string;

    @attr
    public value: string | File | FormData = "";

    /**
     * Focus element when connected. (can we encapsulate this in a @autofocus?)
     * map to proxy
     */
    @attr
    public autofocus: boolean; // Map to proxy element
    private autofocusChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.autofocus = this.autofocus;
        }
    };

    @attr
    public disabled: boolean = false; // Map to proxy element
    private disabledChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.disabled = this.disabled;
        }
    };

    @attr
    public name: string; // Map to proxy element
    private nameChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.name = this.name;
        }
    };

    /**
     * Require the field prior to form submission
     */
    @attr
    public required: boolean = false; // Map to proxy element
    private requiredChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.required = this.required;
        }
    };

    // @reflectTarget
    protected abstract proxy: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    protected elementInternals: ElementInternals;

    constructor() {
        super();

        if (FormAssociated.formAssociated) {
            this.elementInternals = (this as any).attachInternals();
        }
    }

    public connectedCallback() {
        super.connectedCallback();

        if (!FormAssociated.formAssociated) {
            this.appendChild(this.proxy);

            // Make sure we don't fire change events since that will
            // be handled by the parent element
            this.proxy.addEventListener("change", e => e.stopPropagation());
        }

        /**
         * @TODO
         * For form associated elements, click events will be fired
         * on the associated elements when any label is clicked, or the
         * element itself is clicked.
         *
         * For non-associated elements with a proxy-element, only
         * click events on a wrapping label trigger a click event on the
         * custom element. We should decide if this is a case we want to support.
         * Support will be tricky because not only would we need to attach listeners
         * to all labels, we would need to watch for any DOM manipulations that
         * add or remove labels for the component. It may be better to just call
         * out that we don't support this case, but we should discuss
         */
        this.addEventListener("click", this.onLabelClick);
    }

    protected setFormValue() {
        if (this.elementInternals) {
            this.elementInternals.setFormValue(this.value);
        }
    }

    protected onLabelClick(e: MouseEvent) {
        this.focus();
    }

    protected handleKeyPress(e: KeyboardEvent) {
        switch (e.keyCode) {
            case 13: // enter
                if (this.form instanceof HTMLFormElement) {
                    this.form.submit(); // Match input behavior
                }
                break;
        }
    }
}

export class Checkbox extends FormAssociated {
    @attr({ attribute: "readonly" })
    public readOnly: boolean; // Map to proxy element
    private readOnlyChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.readOnly = this.readOnly;
        }
    };

    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     */
    @attr
    public value: string = "on"; // Map to proxy element.
    private valueChanged = (): void => {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.value = this.value;
        }
    };

    /**
     * Provides the default checkedness of the input element
     * Passed down to proxy
     */
    @attr({ attribute: "checked" })
    public checkedAttribute: string | null;
    private checkedAttributeChanged = (): void => {
        this.defaultChecked = typeof this.checkedAttribute === "string";
    };

    /**
     * Initialized to the value of the checked attribute. Can be changed independently of the "checked" attribute,
     * but changing the "checked" attribute always additionally sets this value.
     */
    @observable
    public defaultChecked: boolean = !!this.checkedAttribute;
    private defaultCheckedChanged = (): void => {
        if (!this.dirtyChecked) {
            // Setting this.checked will cause us to enter a dirty state,
            // but if we are clean when defaultChecked is changed, we want to stay
            // in a clean state, so reset this.dirtyChecked
            this.checked = this.defaultChecked;
            this.dirtyChecked = false;
        }
    };

    /**
     * The checked state of the control
     */
    @observable
    public checked: boolean = this.defaultChecked;
    private checkedChanged = (): void => {
        if (!this.dirtyChecked) {
            this.dirtyChecked = true;
        }

        this.setFormValue();

        if (this.proxy instanceof HTMLElement) {
            this.proxy.checked = this.checked;
        }

        if (this.constructed) {
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
        }
    };

    /**
     * The indeterminate state of the control
     */
    @observable
    public indeterminate: boolean = false;
    /**
     * The proxy element if ElementInternals does not exist
     */
    protected proxy: HTMLInputElement = document.createElement("input");

    /**
     * Tracks whether the "checked" property has been changed.
     * This is necessary to provide consistent behavior with
     * normal input checkboxes
     */
    private dirtyChecked: boolean = false;

    /**
     * Set to true when the component has constructed
     */
    private constructed: boolean = false;

    constructor() {
        super();

        this.proxy.setAttribute("type", "checkbox");
        this.constructed = true;
    }

    public connectedCallback() {
        super.connectedCallback();

        if (this.autofocus) {
            this.focus();
        }

        this.setFormValue();

        this.addEventListener("keypress", this.handleKeyPress);
    }

    protected setFormValue() {
        if (this.elementInternals) {
            const value = this.checked ? this.value : null;

            this.elementInternals.setFormValue(value);
        }
    }

    protected onLabelClick(e) {
        super.onLabelClick(e);

        this.checked = !this.checked;
    }

    protected handleKeyPress = (e: KeyboardEvent) => {
        super.handleKeyPress(e);

        switch (e.keyCode) {
            case 32: // space
                this.checked = !this.checked;
                break;
        }
    };
}
