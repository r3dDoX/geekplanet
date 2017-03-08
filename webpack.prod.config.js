/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let definePlugin;
const secretConfig = require('./src/config/secret.config.json');
const environment = {
  MERCHANT_ID: process.env.MERCHANT_ID,
  SIGN: process.env.SIGN,
};

if (process.env.NODE && ~process.env.NODE.indexOf('heroku')) {
  definePlugin = new webpack.DefinePlugin(Object.assign(require('./src/config/heroku.config.json'), secretConfig, environment));
} else {
  definePlugin = new webpack.DefinePlugin(Object.assign(require('./src/config/sccloud.config.json'), secretConfig, environment));
}

const config = {
  entry: {
    main: [
      './src/client/index.jsx',
    ],
    vendor: [
      'auth0-lock',
      'jwt-decode',
      'react',
      'react-dom',
      'react-hot-loader',
      'react-intl',
      'react-redux',
      'react-router',
      'react-tap-event-plugin',
      'redux',
    ]
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[hash].[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'es2015',
              {
                'modules': false
              }
            ],
            'react'
          ],
          plugins: [
            'transform-flow-strip-types',
            'transform-runtime',
            'transform-react-jsx',
            'transform-react-inline-elements',
            'transform-react-constant-elements',
            'transform-react-remove-prop-types',
            [
              'react-intl',
              {
                'messagesDir': './dist/messages',
                'enforceDescriptions': false
              }
            ]
          ],
        },
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
    }),
    definePlugin,
  ],
};


module.exports = config;