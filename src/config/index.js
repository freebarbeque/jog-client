import defaults from './default'
/* eslint-disable global-require,import/no-commonjs */
const environment = require('./env.json').environment

let config /* eslint no-var:0 import/no-mutable-exports:0*/
if (environment === 'DEBUG') {
  config = require('./debug')
} else if (environment === 'RELEASE') {
  config = require('./release')
} else {
  throw new Error(`No environment config found for environment: ${environment}`)
}

config = _.merge(defaults, config.default)
export default config
