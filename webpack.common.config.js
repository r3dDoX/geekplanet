/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const secretConfig = require('./src/config/secret.config.json');

const environmentConfig = require(`./src/config/${process.env.CONFIG || 'local'}.config.json`);

function stringifyValues(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (typeof value === 'object') {
      acc[key] = stringifyValues(value);
    } else {
      acc[key] = JSON.stringify(value);
    }

    return acc;
  }, {});
}

module.exports = {

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin(stringifyValues(environmentConfig)),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/client/assets/',
        to: 'assets/',
      },
    ]),
    new webpack.EnvironmentPlugin(secretConfig),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
};
