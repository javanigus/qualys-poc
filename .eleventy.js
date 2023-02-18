const inspect = require("util").inspect;

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src", {
		//debug: true,
		filter: [
			"404.html",
			"**/*.css",
			"**/*.js",
			"**/*.json",
			"!**/*.11ty.js",
			"!**/*.11tydata.js",
		]
	});
  
	// Copy img folder
	eleventyConfig.addPassthroughCopy("src/img");

	eleventyConfig.setServerPassthroughCopyBehavior("copy");

	// tell 11ty which files to process and which files to copy while maintaining directory structure
	// eleventyConfig.setTemplateFormats(["md","html","njk"]);

	// Run me after the build ends
	eleventyConfig.on('eleventy.after', async () => {

	});

	eleventyConfig.ignores.add("src/404.html");

	// Values can be static:
	eleventyConfig.addGlobalData("myStatic", "static");
	// functions:
	eleventyConfig.addGlobalData("myFunction", () => new Date());

	eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

	// add support for blocks
    eleventyConfig.addShortcode('renderlayoutblock', function(name) {
        var blockContent = '';
        if (this.page.layoutblock && this.page.layoutblock[name]) {
            blockContent = this.page.layoutblock[name];
        } 
        return blockContent;
    });
  
    eleventyConfig.addPairedShortcode('layoutblock', function(content, name) {
        if (!this.page.layoutblock) {
            this.page.layoutblock = {};
        }
        this.page.layoutblock[name] = content;
        return '';
    });

	return {
		dir: {
			input: "src",
			output: "www",
			//  These values are both relative to your input directory.
			includes: "_includes",
			layouts: "_layouts",
		}
	}
};