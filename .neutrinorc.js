var webpack = require('webpack')

module.exports = {
  env: {
    NODE_ENV: {
      production: {
        use: [
          ['neutrino-middleware-minify', {
            babili: {
              booleans: true,
              builtIns: true,
              consecutiveAdds: true,
              deadcode: true,
              evaluate: false,
              flipComparisons: true,
              guards: true,
              infinity: true,
              mangle: true,
              memberExpressions: true,
              mergeVars: true,
              numericLiterals: true,
              propertyLiterals: true,
              regexpConstructors: true,
              removeConsole: true,
              removeDebugger: true,
              removeUndefined: true,
              replace: true,
              simplify: true,
              simplifyComparisons: true,
              typeConstructors: true,
              undefinedToVoid: true,
            }
          }],
        ]
      }
    }
  },
  use: [
    'neutrino-middleware-pwa',
    ['neutrino-preset-react', {
      /* preset options */

      // Example: disable Hot Module Replacement
      hot: false,

      // Example: change the page title
      html: {
        title: 'Jog Insurance'
      },

      devServer: {
        historyApiFallback: true,
      },

      // Add additional Babel plugins, presets, or env options
      babel: {
        // Override options for babel-preset-env
        presets: [
          ['babel-preset-env', {
            // Passing in targets to babel-preset-env will replace them
            // instead of merging them
            targets: {
              browsers: [
                'last 1 Chrome versions',
                'last 1 Firefox versions'
              ]
            }
          }]
        ]
      }
    }],
    (neutrino) => {
      // use urlLoader instead of svgUrlLoader which doesn't seem to work.
      const urlLoader = require.resolve('url-loader');

      neutrino.config.module
        .rule('svg')
        .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
        .use('url')
        .loader(urlLoader)

      // neutrino.config.plugins.delete('minify').end()
      neutrino.config.output.set('publicPath', '/')

      neutrino.config
        .plugin('env')
        .use(webpack.EnvironmentPlugin, ['NODE_ENV', 'JOG_ENVIRONMENT']);
    },

  ]
};
