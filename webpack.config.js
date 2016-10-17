/* eslint-disable */

module.exports = {
    entry: {
        app: [
            './src/client/app.js'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015'
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
