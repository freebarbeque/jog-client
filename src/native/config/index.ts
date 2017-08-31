/* eslint-disable import/no-commonjs */

import * as _ from 'lodash'
import Config from 'react-native-config'
import { IEnvironmentConfig } from '~/common/types'

import debug from './debug'
import defaults from './default'
import relase from './release'

const environment = Config.JOG_ENVIRONMENT

if (!environment) throw new Error('JOG_ENVIRONMENT is not defined')

console.log(`JOG_ENVIRONMENT=${environment}`)

let config: IEnvironmentConfig /* eslint no-var:0 import/no-mutable-exports:0*/

if (environment === 'DEBUG') {
  config = debug
} else if (environment === 'RELEASE') {
  config = relase
} else {
  throw new Error(`No environment config found for environment: ${environment}`)
}

config = _.merge(defaults, {
  ...config,
  environment,
  isDebug: environment === 'DEBUG',
})

export default config
