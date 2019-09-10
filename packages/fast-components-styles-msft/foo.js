const baseline = require("./results.baseline.json");
const delta = require("./results.post-memoize.json");

function sum(a, b) {
    return a + b;
}

function ops(data) {
    return data.ops;
}

const baselineAccum = baseline.map(ops).reduce(sum);
const deltaAccum = delta.map(ops).reduce(sum);

console.log(( deltaAccum - baselineAccum ) / baselineAccum * 100)

