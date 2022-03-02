const fs = require("fs");
const path = require("path");

const isDev = process.env.APP_ENV === "development";

const manifestPath = path.resolve(__dirname, "docs", "assets", "manifest.json");
const manifest = isDev
    ? {
        "main.js": "/assets/index.js",
        "main.css": "/assets/index.css",
    }
    : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    // Add a shortcode for bundled CSS.

    eleventyConfig.addHandlebarsShortcode("scriptPath", function () {
        return manifest["main.js"];
    })

    eleventyConfig.addHandlebarsShortcode("stylePath", function () {
        return manifest["main.css"];
    })

    eleventyConfig.addHandlebarsHelper("proper", function (myStringArg) {
        return myStringArg.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    });

    return {
        dir: {
            input: "src",
            output: "docs",
        },
        passthroughFileCopy: true,
    };
};
