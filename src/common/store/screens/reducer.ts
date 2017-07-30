import { combineReducers } from 'redux'
import auth from './auth/reducer'
import addManualPolicy from './addManualPolicy/reducer'
import settings from './settings/reducer'

const ScreensReducer = combineReducers({
  auth,
  addManualPolicy,
  settings,
})

export default ScreensReducer
