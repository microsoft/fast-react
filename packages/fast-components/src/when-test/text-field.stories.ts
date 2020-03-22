import { WhenTest } from "./";
import WhenTestTemplate from "./fixtures/when-test.html";

// Prevent tree-shaking
WhenTest;

export default {
    title: "When Test",
};

export const Test = () => WhenTestTemplate;
