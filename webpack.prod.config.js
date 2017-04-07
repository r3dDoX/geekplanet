/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const secretConfig = require('./src/config/secret.config.json');
Object.keys(secretConfig).map((key) => {
  secretConfig[key] = `'${secretConfig[key] || process.env[key]}'`;
});

module.exports = merge(commonConfig, {
  entry: './src/client/index.jsx',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    new webpack.DefinePlugin(Object.assign(
      require('./src/config/heroku.config.json'),
      secretConfig,
      {
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }
    )),
  ],
});
