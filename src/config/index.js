/* eslint-disable import/no-commonjs */

const Config = require('react-native-config')
const _ = require('lodash')
const defaults = require('./default')

const environment = Config.JOG_ENVIRONMENT || 'DEBUG'

console.log(`JOG_ENVIRONMENT=${environment}`)

let config /* eslint no-var:0 import/no-mutable-exports:0*/
if (environment === 'DEBUG') {
  config = require('./debug')
} else if (environment === 'RELEASE') {
  config = require('./release')
} else {
  throw new Error(`No environment config found for environment: ${environment}`)
}


config = _.merge(defaults, { ...config.default, environment, isDebug: environment === 'DEBUG' })

export default config
