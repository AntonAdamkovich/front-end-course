const Path = require('path');
const Webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: `${__dirname}/src/js/`,
    entry: './main',
    output: {
        path: Path.resolve(__dirname, 'dist'),
        publicPath: './dist',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: Path.join(__dirname, 'src/js/'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                },
            },

        ],
    },
    devtool: 'cheap-source-map',
    watch: true,
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./', './dist'] },
        }),
        new Webpack.optimize.UglifyJsPlugin({
            compress: true,
            debug: true,
        }),
        new ExtractTextPlugin('style.css'),
    ],
};

module.exports = config;
