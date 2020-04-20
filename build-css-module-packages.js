/* eslint-disable */
const path = require("path");
const names = [
    "fast-components-react-msft",
    "fast-components-styles-msft",
    "fast-jss-manager-react",
    "fast-jss-utilities",
];
const fs = require("fs");
const { execSync } = require("child_process");

const outDir = path.resolve(__dirname, "tarballs");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (name of names) {
    const dirpath = path.resolve(__dirname, "packages", "react", name);

    const stdout = execSync("npm pack", { cwd: dirpath }).toString();
    const tarball = stdout.match(/(microsoft.+tgz)/g)[0];

    fs.renameSync(path.resolve(dirpath, tarball), path.resolve(outDir, tarball));
}
/* eslint-enable */
