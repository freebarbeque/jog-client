const webpack = require('webpack')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.tsx'
  ],
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist',
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
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },
      { test: /\.png|.jpg|.jpeg|.bmp$/, loader: 'url-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      JOG_ENVIRONMENT: process.env.JOG_ENVIRONMENT || 'DEBUG', 
      NODE_ENV: process.env.NODE_ENV || 'development',
      JOG_WEB_API_ENDPOINT: process.env.JOG_WEB_API_ENDPOINT
    }),
    new CaseSensitivePathsPlugin()
  ]
}
