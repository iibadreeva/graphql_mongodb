const precss = require('precss');
const postcssNested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import')({
  skipDuplicates: false
});
const colorFunction = require('postcss-color-function');

module.exports = {
  plugins: [
    precss,
    cssnext,
    postcssImport,
    postcssNested,
    colorFunction({ preserveCustomProps: true })
  ]
};
