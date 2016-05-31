var fs = require('fs');

var babelrc = fs.readFileSync('.babelrc');
var config;
var path = require('path');

var rootDir = path.resolve(__dirname, '..')

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('babel-core/register')(config);
//require('../server');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function() {
      require('../src/server');
    });
