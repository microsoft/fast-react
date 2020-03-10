import { html, when } from "@microsoft/fast-element";
import { Slider } from "./slider";
import { ref } from "@microsoft/fast-element/src/directives";

export const SliderTemplate = html<Slider>`
    <div
        ${ref("backgroundTrack")}
    >
    </div>
`;
