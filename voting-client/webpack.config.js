var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        contentBase: './dist',
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
