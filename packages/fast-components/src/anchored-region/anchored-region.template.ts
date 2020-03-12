import { html, ref } from "@microsoft/fast-element";
import { AnchoredRegion } from "./anchored-region";

export const AnchoredRegionTemplate = html<AnchoredRegion>`
  <template>
  top: ${x => x.regionTop} <br>
  right: ${x => x.regionRight}<br> 
  bottom: ${x => x.regionBottom}<br>
  left: ${x => x.regionLeft}<br>
  transform-origin: ${x => x.xTransformOrigin} ${x => x.yTransformOrigin}<p>

    <button
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent, "top", "left")}"
    >
    top left
    </button>

    <button
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent, "top", "right")}"
    >
    top right
    </button>

    <button
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent, "bottom", "left")}"
    >
    bottom left
    </button>

    <button
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent, "bottom", "right")}"
    >
    bottom right
    </button>

    <div
    class="region"
    style="
        top: ${x => x.regionTop};
        right: ${x => x.regionRight}; 
        bottom: ${x => x.regionBottom};
        left: ${x => x.regionLeft}; 
        transform-origin: ${x => x.xTransformOrigin} ${x => x.yTransformOrigin};
    "/>
  </template>
`;
