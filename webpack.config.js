/* eslint-disable */

module.exports = {
  entry: {
    app: [
      './src/client/app.jsx'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-flow-strip-types',
            'transform-runtime',
            'transform-react-jsx'
          ]
        }
      }
    ]
  }
};
