var Benchmark = require("benchmark");
const designSystem = require("./dist/design-system").default;

var suite = new Benchmark.Suite();
suite.add("Foo", () => {});
