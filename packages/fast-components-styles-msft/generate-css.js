const jss = require("jss").default;
const preset = require("jss-preset-default").default;
// import * as preset from "jss-preset-default";
import { AccentButtonStyles } from "./src";
import fs from "fs";

function generateClassName(rule, sheet) {
    return rule.key;
}

jss.setup(preset());
const style = jss
    .createStyleSheet(AccentButtonStyles, { generateClassName })
    .update({})
    .toString();

fs.writeFileSync("./dist/accent-button/style.css", style);
