const pre = require("./recipes-pre.json");
const post = require("./recipes-post.json");

const output = pre.map((preData, index) => {
    const postData = post[index];
    // console.log("pre: " + preData.ops + "\npost:" + postData.ops)
    // return [preData.functionName, ((postData.ops - preData.ops) / preData.ops * 100) + "%"]
    //
    return preData.ops > postData.ops ? "pre" : "post";
});

console.log(output)

