import { FASTCheckbox } from ".";
import { FASTDesignSystemProvider } from "../design-system-provider";
import MarkTemplate from "./fixtures/mark.html";

// Prevent tree-shaking
FASTCheckbox;
FASTDesignSystemProvider;

export default {
    title: "Checkbox",
};

export const Mark = () => MarkTemplate;

document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
        document.forms[0].addEventListener("change", e => {
            console.log(e);
        });
    }
});
