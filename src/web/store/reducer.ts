import { routerReducer } from 'react-router-redux'
import { initReducer } from '../../common/store/reducer'
import dimensions from './dimensions/reducer'

export default initReducer({
  router: routerReducer,
  dimensions,
})
