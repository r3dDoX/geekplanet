/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const secretConfig = require('./src/config/secret.config.json');

Object.keys(secretConfig).map((key) => {
  secretConfig[key] = `'${secretConfig[key]}'`;
});

module.exports = merge(commonConfig, {
  devtool: 'source-map',

  entry: {
    main: [
      './src/client/index.jsx',
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
    ],
    devServerClient: 'webpack-dev-server/client?http://0.0.0.0:3001',
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[hash].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(Object.assign(require('./src/config/local.config.json'), secretConfig)),
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3001,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    proxy: {
      '/api/**': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 3000,
        },
      },
    },
  },
});
