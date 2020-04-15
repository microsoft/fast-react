const resolve = require("rollup-plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const path = require("path");

module.exports = {
    input: path.resolve(__dirname, "./generate-css.js"),
    output: {
        file: ".tmp/generate-css.js",
        format: "cjs",
    },
    plugins: [resolve(), typescript()],
    external: ["fs", "path"],
};
