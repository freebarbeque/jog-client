import EnvironmentManager from 'react-native-env'
import defaults from './default'

const environment = EnvironmentManager.getSync('JogEnvironment')

console.log('environment', environment)

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
