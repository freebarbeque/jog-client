// @flow

import { combineReducers } from 'redux'
import auth from './auth/reducer'
import addManualPolicy from './addManualPolicy/reducer'

const ScreensReducer = combineReducers({
  auth,
  addManualPolicy
})

export default ScreensReducer
