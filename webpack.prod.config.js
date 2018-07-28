/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',

  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js',
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      minRatio: 0.8,
    }),
  ],
});
