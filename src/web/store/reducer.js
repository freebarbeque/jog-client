// @flow

import { routerReducer } from 'react-router-redux'
import dimensions from './dimensions/reducer'
import { initReducer } from '../../common/store/reducer'

export default initReducer({
  router: routerReducer,
  dimensions,
})
