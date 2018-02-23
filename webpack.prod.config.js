const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const vars = require('dotenv').config({ path: `.env.staging` });

console.log(`Webpack NODE_ENV=${process.env.NODE_ENV}`);
console.log(vars.parsed);

module.exports = {
    entry: ['babel-polyfill', './src/index.tsx'],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    devtool: 'source-map',

    resolve: {
        alias: { src: 'src' },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsConfigPathsPlugin({
                configFileName: 'tsconfig.json',
                compiler: 'typescript',
            }),
        ],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension
            // will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader?useBabel=true&useCache=true'],
            },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },
            { test: /\.png|.jpg|.jpeg|.bmp|.ico$/, loader: 'url-loader' },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },

    externals: {},

    plugins: [
        new webpack.EnvironmentPlugin(
            Object.assign(vars.parsed ? vars.parsed : {}, {
                NODE_ENV: process.env.NODE_ENV || 'production',
            })
        ),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            favicon: './src/static/favicon.ico',
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
        // Minify JS
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
        }),
    ],
};
