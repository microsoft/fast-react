import { attr, FastElement, observable, ref } from "@microsoft/fast-element";

export class AnchoredRegion extends FastElement {
    /**
     * values to be applied to the component's transform origin attribute on render
     */
    @observable
    public xTransformOrigin: string = "left";

    @observable
    public yTransformOrigin: string = "top";

    /**
     * values to be applied to the component's positioning attributes on render
     */
    @observable
    public regionTop: string = "unset";

    @observable
    public regionRight: string = "unset";

    @observable
    public regionBottom: string = "unset";

    @observable
    public regionLeft: string = "unset";

    constructor() {
        super();
    }

    public clickHandler = (e: MouseEvent, verticalVal: string, horizontalVal: string) => {
        if (verticalVal === "top") {
            this.regionTop = "100px";
            this.regionBottom = "unset";
            this.yTransformOrigin = "bottom";
        } else {
            this.regionTop = "unset";
            this.regionBottom = "100px";
            this.yTransformOrigin = "top";
        }

        if (horizontalVal === "left") {
            this.regionLeft = "100px";
            this.regionRight = "unset";
            this.xTransformOrigin = "right";
        } else {
            this.regionLeft = "unset";
            this.regionRight = "100px";
            this.xTransformOrigin = "left";
        }
    };
}
