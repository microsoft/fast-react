const Benchmark = require("benchmark");
import DesignSystem from "./src/design-system"
import * as recipes from "./src/utilities/color";
import fs from "fs";

const keep = [
    "neutralForegroundRest",
    "neutralForegroundHover",
    "neutralForegroundActive",
    "accentForegroundCut",
    "accentForegroundCutLarge",
    "neutralForegroundHint",
    "neutralForegroundHintLarge",
    "accentForegroundRest",
    "accentForegroundHover",
    "accentForegroundActive",
    "accentForegroundLargeRest",
    "accentForegroundLargeHover",
    "accentForegroundLargeActive",
    "neutralFillRest",
    "neutralFillHover",
    "neutralFillActive",
    "neutralFillSelected",
    "neutralFillStealthRest",
    "neutralFillStealthHover",
    "neutralFillStealthActive",
    "neutralFillStealthSelected",
    "neutralFillInputRest",
    "neutralFillInputHover",
    "neutralFillInputActive",
    "neutralFillInputSelected",
    "accentFillRest",
    "accentFillHover",
    "accentFillActive",
    "accentFillSelected",
    "accentFillLargeRest",
    "accentFillLargeHover",
    "accentFillLargeActive",
    "accentFillLargeSelected",
    "neutralFillCard",
    "neutralOutlineRest",
    "neutralOutlineHover",
    "neutralOutlineActive",
    "neutralDividerRest",
    "neutralLayerFloating",
    "neutralLayerCard",
    "neutralLayerCardContainer",
    "neutralLayerL1",
    "neutralLayerL2",
    "neutralLayerL3",
    "neutralLayerL4",
].map((key) => {
    return recipes[key](DesignSystem).toStringHexRGB().toUpperCase()
});

fs.writeFileSync("./change-results.js", JSON.stringify(keep));

// var suite = new Benchmark.Suite();
// DesignSystem.neutralPalette
//     .map((color) => Object.assign({}, DesignSystem, { backgroundColor: color }))
//     .forEach((designSystem) => {
//         suite.add("baseline " + designSystem.backgroundColor, () => neutralForegroundHint(designSystem))
//     });
// 
// suite.on("complete", function() {
//     const body = Object.keys(this)
//         .filter(key => this[key] && this[key].name && this[key].hz)
//         .map(key => ({
//             functionName: this[key].name,
//             ops: this[key].hz,
//             opsMs: this[key].hz / 1000,
// 
//         }));
//     fs.writeFileSync("./results.post-memoize.json", JSON.stringify(body, null, 4));
// 
// });
// 
// suite.run();
