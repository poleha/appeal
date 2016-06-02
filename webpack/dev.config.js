const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
    //new ExtractTextPlugin('bundle.css'),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    //new webpack.ProvidePlugin({
    //  jQuery: 'jquery',
    //}),
  ],
};
