// @flow

import { initReducer } from 'jog/src/common/store/reducer'

import nav from './nav/reducer'
import push from './push/reducer'

export default initReducer({
  nav,
  push,
})
