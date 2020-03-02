import { html } from "@microsoft/fast-element";
import { Checkbox } from "./checkbox";

export const CheckboxTemplate = html<Checkbox>`
    <div>${x => x.checked}</div>
`;
