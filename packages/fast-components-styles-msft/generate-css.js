const jss = require("jss").default;
const preset = require("jss-preset-default").default;
// import * as preset from "jss-preset-default";
import { AccentButtonStyles, ButtonStyles, CardStyles } from "./src";
import fs from "fs";

function generateClassName(rule, sheet) {
    return rule.key;
}

jss.setup(preset());
const style = jss
    .createStyleSheet(CardStyles, { generateClassName })
    .update({})
    .toString();

fs.writeFileSync("./dist/card/style.css", style);
