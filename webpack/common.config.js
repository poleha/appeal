const path = require('path');
//const autoprefixer = require('autoprefixer');
//const postcssImport = require('postcss-import');
const merge = require('webpack-merge');

const development = require('./dev.config.js');
const build = require('./build.config.js');

require('babel-polyfill');

const TARGET = process.env.npm_lifecycle_event;
//'start' for npm start


const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../dist'),
};

//process.env.BABEL_ENV = TARGET;


const common = {
  entry: [
    PATHS.app,
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modulesDirectories: ['node_modules', PATHS.app],
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, '../src'),
        ],
      }
    ],
    loaders: [ {
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }],
  },
};

if (TARGET === 'start-dev') {
  module.exports = merge(development, common);
}

if (TARGET === 'build') {
  module.exports = merge(build, common);
}


