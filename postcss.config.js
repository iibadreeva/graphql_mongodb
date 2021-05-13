const precss = require('precss');
const postcssNested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import')({
  skipDuplicates: false
});

module.exports = {
  plugins: [precss, cssnext, postcssImport, postcssNested]
};
