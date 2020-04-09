const jss = require("jss").default;
const preset = require("jss-preset-default").default;
// import * as preset from "jss-preset-default";
import { AccentButtonStyles, ButtonStyles } from "./src";
import fs from "fs";

function generateClassName(rule, sheet) {
    return rule.key;
}

jss.setup(preset());
const style = jss
    .createStyleSheet(ButtonStyles, { generateClassName })
    .update({})
    .toString();

fs.writeFileSync("./dist/button/style.css", style);
