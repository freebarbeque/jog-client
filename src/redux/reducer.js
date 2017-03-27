// @flow

import { combineReducers } from 'redux'
import nav from './nav/reducer'
import auth from './auth/reducer'

const AppReducer = combineReducers({
  nav,
  auth,
})

export default AppReducer
