const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HTMLPlugin = new HTMLWebpackPlugin({
    template: './development/index.html',
    filename: '../index.html',
    inject: 'body',
});

module.exports = {
    entry: './development/src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'production', 'src')
    },
    mode: 'production',
    plugins: [ 
        HTMLPlugin, 
        new UglifyJSWebpackPlugin(),
        new MiniCssExtractPlugin('main.[hash].css')
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
                    MiniCssExtractPlugin.loader,
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