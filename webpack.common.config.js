/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'react-svg-inline-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/client/assets/',
        to: 'assets/',
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
  ],
};
