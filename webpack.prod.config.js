/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    filename: '[name].[chunkhash].js',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    definePlugin,
  ],
};


module.exports = config;