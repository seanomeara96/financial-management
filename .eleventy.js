module.exports = function(eleventyConfig){
console.log("################################")
    return {
        dir: {
            input: "src",
            output: "docs"
        },
        passthroughFileCopy: true
    }
}