const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');



// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
  devtool: 'source-map',
  entry: [
    //'bootstrap-loader',
    //'webpack-hot-middleware/client',
    './src/client',
  ],
  output: {
    publicPath: '/dist/',
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    webpackIsomorphicToolsPlugin.development()
    //new ExtractTextPlugin('bundle.css'),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    //new webpack.ProvidePlugin({
    //  jQuery: 'jquery',
    //}),
  ],
};
