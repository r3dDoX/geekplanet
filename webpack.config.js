/* eslint-disable */

const path = require('path'),
      webpack = require("webpack"),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    './src/client/app.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: "bundle.client.js"
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-flow-strip-types',
            'transform-runtime',
            'transform-react-jsx',
            'react-hot-loader/babel'
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/client/assets/',
        to: 'assets/'
      }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3001,
    contentBase: 'dist/',
    hot: true,
    proxy: {
      '/api/**': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 3000
        }
      }
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  )
}

module.exports = config;