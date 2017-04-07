// @flow

import { combineReducers } from 'redux'
import nav from './nav/reducer'
import auth from './auth/reducer'
import screens from './screens/reducer'
import policies from './policies/reducer'

const AppReducer = combineReducers({
  nav,
  auth,
  screens,
  policies
})

export default AppReducer
