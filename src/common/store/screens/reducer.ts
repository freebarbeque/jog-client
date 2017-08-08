import { combineReducers } from 'redux'
import addManualPolicy from './addManualPolicy/reducer'
import auth from './auth/reducer'
import settings from './settings/reducer'

const ScreensReducer = combineReducers({
  auth,
  addManualPolicy,
  settings,
})

export default ScreensReducer
