/* eslint-disable */

module.exports = {
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
                        'transform-runtime',
                        'transform-react-jsx'
                    ]
                }
            }
        ]
    }
};
