// @flow

/* eslint-disable import/no-commonjs */

import Config from 'react-native-config'
import _ from 'lodash'
import type { EnvironmentConfig } from 'jog/src/common/types'

import defaults from './default'
import debug from './debug'
import relase from './release'

const environment = Config.JOG_ENVIRONMENT

if (!environment) throw new Error('JOG_ENVIRONMENT is not defined')

console.log(`JOG_ENVIRONMENT=${environment}`)

let config: EnvironmentConfig /* eslint no-var:0 import/no-mutable-exports:0*/

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
