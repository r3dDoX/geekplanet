/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  entry: './src/client/index.jsx',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    new webpack.DefinePlugin(
      require('./src/config/heroku.config.json')
    ),
  ],
});
