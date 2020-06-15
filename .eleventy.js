const pluginSass = require("eleventy-plugin-sass");

const sassPluginOptions = {
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSass, sassPluginOptions);
  eleventyConfig.addPassthroughCopy("src/assets/images");

  return {
    dir: {
      input: "src",
      output: "_site",
    }
  };
};
