import { html } from "@microsoft/fast-element";
import { Checkbox } from "./checkbox";

export const CheckboxTemplate = html<Checkbox>`
    <div
        role="checkbox"
        tabindex="0"
        $aria-checked="${x => x.checked}"
        $aria-disabled="${x => x.disabled}"
        $aria-required="${x => x.required}"
    >
        fast-checkbox
    </div>
`;
