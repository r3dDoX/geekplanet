/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const secretConfig = require('./src/config/secret.config.json');

Object.keys(secretConfig).map((key) => {
  secretConfig[key] = `'${secretConfig[key]}'`;
});

const config = {
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
            'react-hot-loader/babel',
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
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'react-svg-inline-loader',
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
};

module.exports = config;