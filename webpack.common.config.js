/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const envConfig = require('./src/config/envConfig');

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
    new webpack.DefinePlugin(stringifyValues(envConfig.getEnvironmentSpecificConfig())),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/client/assets/',
        to: 'assets/',
      },
      {
        from: `src/config/robots${envConfig.getEnvKey() === 'production' ? '_prod' : ''}.txt`,
        to: 'robots.txt',
      },
    ]),
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
