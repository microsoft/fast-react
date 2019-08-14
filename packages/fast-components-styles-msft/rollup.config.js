const resolve = require("rollup-plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const commonjs = require("rollup-plugin-commonjs");
const path = require("path");

module.exports = {
    input: path.resolve(__dirname, "./perf.js"),
    output: {
        file: "./perf.rolled.js",
        format: "cjs",
    },
    plugins: [typescript(), commonjs(), resolve()],
};
