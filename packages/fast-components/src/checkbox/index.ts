import { customElement } from "@microsoft/fast-element";
import { Checkbox } from "./checkbox";
import { CheckboxTemplate } from "./checkbox.template";

@customElement({
    name: "fast-checkbox",
    template: CheckboxTemplate,
})
export class FASTCheckbox extends Checkbox {}
export * from "./checkbox.template";
export * from "./checkbox";
