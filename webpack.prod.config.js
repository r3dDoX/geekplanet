/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  devtool: 'source-map',

  entry: './src/client/index.jsx',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    new webpack.DefinePlugin(
      require(`./src/config/${process.env.CONFIG}.config.json`)
    ),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
