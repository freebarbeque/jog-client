// @flow

import { combineReducers } from 'redux'
import auth from './auth/reducer'

const ScreensReducer = combineReducers({
  auth,
})

export default ScreensReducer
