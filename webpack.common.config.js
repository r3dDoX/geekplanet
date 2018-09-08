/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const envConfig = require('./src/config/envConfig');

function stringifyValues(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (value === null) {
      acc[key] = value;
    } else if (typeof value === 'object') {
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
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/redux-form'),
        ],
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
      minify: {
        minifyCSS: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
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
  ],
};
