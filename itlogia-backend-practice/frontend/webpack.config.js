const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    devServer: {
        static: './dist',
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/views', to: 'views' },
                { from: './src/styles', to: 'styles' },
            ]
        })
    ]
};