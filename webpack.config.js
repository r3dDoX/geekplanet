/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            [
              'react-intl',
              {
                'messagesDir': './dist/messages',
                'enforceDescriptions': false
              }
            ]
          ],
          env: {
            local: {
              plugins: [
                'react-hot-loader/babel',
              ],
            },
            production: {
              plugins: [
                'transform-react-inline-elements',
                'transform-react-constant-elements',
              ],
            }
          }
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
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

if (process.env.NODE_ENV === 'production') {
  let definePlugin;

  if (process.env.NODE && ~process.env.NODE.indexOf('heroku')) {
    definePlugin = new webpack.DefinePlugin(require('./src/config/heroku.config.json'));
  } else {
    definePlugin = new webpack.DefinePlugin(require('./src/config/sccloud.config.json'));
  }

  config.plugins.push(
    definePlugin
  );
} else {
  config.devtool = 'source-map';
  config.entry.main.push(
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  );
  config.entry.vendor.push(
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  );
  config.entry.devServerClient = 'webpack-dev-server/client?http://0.0.0.0:3001';
  config.plugins.push(
    new webpack.DefinePlugin(require('./src/config/local.config.json')),
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;