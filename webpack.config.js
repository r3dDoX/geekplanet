/* eslint-disable */

const path = require('path'),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  localConfig = require('./src/client/config/local.config.json'),
  prodConfig = require('./src/client/config/prod.config.json');

const config = {
  devtool: 'source-map',

  entry: [
    './src/client/index.jsx',
  ],

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.client.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-flow-strip-types',
            'transform-runtime',
            'transform-react-jsx',
            'react-hot-loader/babel',
            [
              "react-intl",
              {
                "messagesDir": "./dist/messages",
                "enforceDescriptions": false
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
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3001,
    contentBase: path.join(__dirname, 'dist'),
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

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),
    new webpack.DefinePlugin(prodConfig)
  )
} else {
  config.entry.unshift(
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server'
  );
  console.log(localConfig);
  config.plugins.push(
    new webpack.DefinePlugin(localConfig)
  )
}

module.exports = config;