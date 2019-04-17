const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const HTMLPlugin = new HTMLWebpackPlugin({
    template: './development/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: './development/src/index.js',
    devServer: {
        host: 'localhost',
        port: '7777',
        historyApiFallback: true,
        open: true,
        stats: 'minimal',
        hot: true
    },
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    plugins: [ 
        HTMLPlugin, 
        new UglifyJSWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                // .js loader
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                // .css loader
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                // font loader
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: 'fonts/'
                    }
                }]
            }, {
                // image loader
                test: /.(jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',    // where the images will go
                        publicPath: 'images/'
                    }
                }]
            }
        ]
    }
}