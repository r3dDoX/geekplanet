/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

let definePlugin;
const secretConfig = require('./src/config/secret.config.json');

Object.keys(secretConfig).map((key) => {
  secretConfig[key] = `'${secretConfig[key] || process.env[key]}'`;
});

if (process.env.NODE && ~process.env.NODE.indexOf('heroku')) {
  definePlugin = new webpack.DefinePlugin(Object.assign(require('./src/config/heroku.config.json'), secretConfig));
} else {
  definePlugin = new webpack.DefinePlugin(Object.assign(require('./src/config/sccloud.config.json'), secretConfig));
}

module.exports = merge(commonConfig, {
  entry: './src/client/index.jsx',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    definePlugin,
  ],
});
