// @flow

import { combineReducers } from 'redux'
import nav from './nav/reducer'
import auth from './auth/reducer'
import screens from './screens/reducer'

const AppReducer = combineReducers({
  nav,
  auth,
  screens
})

export default AppReducer
