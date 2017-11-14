const webpack = require('webpack')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vars = require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(vars.parsed);

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.tsx'
    ],
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`,
        publicPath: '/',
    },

    node: {
        fs: 'empty',
    },

    devServer: {
        historyApiFallback: true,
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader'},
            {test: /\.png|.jpg|.jpeg|.bmp$/, loader: 'url-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
        ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {},

    plugins: [
        new webpack.EnvironmentPlugin(Object.assign(
            vars.parsed ? vars.parsed : {},
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
            })),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ]
}
