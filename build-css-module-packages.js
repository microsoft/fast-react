/* eslint-disable */
const path = require("path");
const names = [
    "fast-components-react-msft",
    "fast-components-styles-msft",
    // "fast-jss-manager-react",
    // "fast-jss-utilities"
];
const { execSync } = require("child_process");

for (name of names) {
    const dirpath = path.resolve(__dirname, "packages", "react", name);

    console.log(execSync("npm pack", { cwd: dirpath }).toString());
}
/* eslint-endable */
