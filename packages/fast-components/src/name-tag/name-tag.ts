import { attr, FastElement } from "@microsoft/fast-element";

export class NameTag extends FastElement {
    @attr
    public greeting: string = "Hello";

    constructor() {
        super();

        console.log("name-tag constructor fired");
    }

    public connectedCallback() {
        console.log("name-tag connectedCallback fired");
    }
}
