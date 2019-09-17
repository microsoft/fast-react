const Benchmark = require("benchmark");
import DesignSystem from "./src/design-system"
import * as recipes from "./src/utilities/color";
import fs from "fs";

const recipeNames = [
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
];

var suite = new Benchmark.Suite();
const designSystems = DesignSystem.neutralPalette.map((color) => Object.assign({}, DesignSystem, { backgroundColor: color }));

recipeNames.forEach((recipeName) => {
        suite.add(`${recipeName}`, () => designSystems.forEach((d) => recipes[recipeName](d)))
    //});
})

suite.on("complete", function() {
    const body = Object.keys(this)
        .filter(key => this[key] && this[key].name && this[key].hz)
        .map(key => ({
            functionName: this[key].name,
            ops: this[key].hz,
            opsMs: this[key].hz / 1000,

        }));
    fs.writeFileSync("./recipes-pre-bin-search.json", JSON.stringify(body, null, 4));

});

suite.on("cycle", function(arg) {
    console.log(arg.target.name)
});

suite.run();
