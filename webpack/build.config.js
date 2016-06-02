const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    //'bootstrap-loader',
    //'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    publicPath: '/dist/',
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
            // activate source maps via loader query
            'css?sourceMap!' +
            'less?sourceMap'
        )
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"build"',
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

  ],
};







