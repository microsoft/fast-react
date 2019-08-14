import DesignSystem from "./src/design-system";
import {
    neutralForegroundRest,
    neutralForegroundHover,
    neutralForegroundActive,
    accentForegroundCut,
    accentForegroundCutLarge,
    neutralForegroundHint,
    neutralForegroundHintLarge,
    accentForegroundRest,
    accentForegroundHover,
    accentForegroundActive,
    accentForegroundLarge,
    accentForegroundLargeRest,
    accentForegroundLargeHover,
    accentForegroundLargeActive,
    neutralFillRest,
    neutralFillHover,
    neutralFillActive,
    neutralFillSelected,
    neutralFillStealthRest,
    neutralFillStealthHover,
    neutralFillStealthActive,
    neutralFillStealthSelected,
    neutralFillInputRest,
    neutralFillInputHover,
    neutralFillInputActive,
    neutralFillInputSelected,
    accentFillRest,
    accentFillHover,
    accentFillActive,
    accentFillSelected,
    accentFillLargeRest,
    accentFillLargeHover,
    accentFillLargeActive,
    accentFillLargeSelected,
    neutralFillCard,
    neutralOutlineRest,
    neutralOutlineHover,
    neutralOutlineActive,
    neutralLayerFloating,
    neutralLayerCard,
    neutralLayerCardContainer,
    neutralLayerL1,
    neutralLayerL1Alt,
    neutralLayerL2,
    neutralLayerL3,
    neutralLayerL4,
} from "./src/utilities/color";
const Benchmark = require("benchmark");
import fs from "fs";

var suite = new Benchmark.Suite();
const colorRecipes = [
    [neutralForegroundRest, "neutralForegroundRest"],
    [neutralForegroundHover, "neutralForegroundHover"],
    [neutralForegroundActive, "neutralForegroundActive"],
    [accentForegroundCut, "accentForegroundCut"],
    [accentForegroundCutLarge, "accentForegroundCutLarge"],
    [neutralForegroundHint, "neutralForegroundHint"],
    [neutralForegroundHintLarge, "neutralForegroundHintLarge"],
    [accentForegroundRest, "accentForegroundRest"],
    [accentForegroundHover, "accentForegroundHover"],
    [accentForegroundActive, "accentForegroundActive"],
    [accentForegroundLarge, "accentForegroundLarge"],
    [accentForegroundLargeRest, "accentForegroundLargeRest"],
    [accentForegroundLargeHover, "accentForegroundLargeHover"],
    [accentForegroundLargeActive, "accentForegroundLargeActive"],
    [neutralFillRest, "neutralFillRest"],
    [neutralFillHover, "neutralFillHover"],
    [neutralFillActive, "neutralFillActive"],
    [neutralFillSelected, "neutralFillSelected"],
    [neutralFillStealthRest, "neutralFillStealthRest"],
    [neutralFillStealthHover, "neutralFillStealthHover"],
    [neutralFillStealthActive, "neutralFillStealthActive"],
    [neutralFillStealthSelected, "neutralFillStealthSelected"],
    [neutralFillInputRest, "neutralFillInputRest"],
    [neutralFillInputHover, "neutralFillInputHover"],
    [neutralFillInputActive, "neutralFillInputActive"],
    [neutralFillInputSelected, "neutralFillInputSelected"],
    [accentFillRest, "accentFillRest"],
    [accentFillHover, "accentFillHover"],
    [accentFillActive, "accentFillActive"],
    [accentFillSelected, "accentFillSelected"],
    [accentFillLargeRest, "accentFillLargeRest"],
    [accentFillLargeHover, "accentFillLargeHover"],
    [accentFillLargeActive, "accentFillLargeActive"],
    [accentFillLargeSelected, "accentFillLargeSelected"],
    [neutralFillCard, "neutralFillCard"],
    [neutralOutlineRest, "neutralOutlineRest"],
    [neutralOutlineHover, "neutralOutlineHover"],
    [neutralOutlineActive, "neutralOutlineActive"],
    [neutralLayerFloating, "neutralLayerFloating"],
    [neutralLayerCard, "neutralLayerCard"],
    [neutralLayerCardContainer, "neutralLayerCardContainer"],
    [neutralLayerL1, "neutralLayerL1"],
    [neutralLayerL1Alt, "neutralLayerL1Alt"],
    [neutralLayerL2, "neutralLayerL2"],
    [neutralLayerL3, "neutralLayerL3"],
    [neutralLayerL4, "neutralLayerL4"],
].forEach(recipe => {
    suite.add(recipe[1], () => {
        recipe[0](DesignSystem);
    });
});

suite.on("complete", function() {
    const body = Object.keys(this)
        .filter(key => this[key] && this[key].name && this[key].hz)
        .map(key => ({
            functionName: this[key].name,
            ops: this[key].hz,
            opsMs: this[key].hz / 1000,
        }));
    fs.writeFileSync("./results.post-memoize.json", JSON.stringify(body, null, 4));
});

suite.run();
