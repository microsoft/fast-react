import { FastElement } from "@microsoft/fast-element";

export class Slider extends FastElement {
    public backgroundTrack: HTMLDivElement;

    public connectedCallback(): void {
        super.connectedCallback();

        console.log("ref:", this.backgroundTrack);
    }
}
