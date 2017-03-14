var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "[name]-[hash].js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules!postcss-loader'
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
            }
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.templ.html'
        }),
        new webpack.BannerPlugin("Copyright 233 inc."),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()        
    ]
}
