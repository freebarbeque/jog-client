'use strict'

import { AppRegistry } from 'react-native'
import App from './build'

const TestFairy = require('react-native-testfairy');

TestFairy.begin('de972f078461634a81a28f0a888ff58ad4e48b76')
AppRegistry.registerComponent('ReactNativeTS', () => App)
