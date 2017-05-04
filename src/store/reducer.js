// @flow

import { combineReducers } from 'redux'
import nav from './nav/reducer'
import auth from './auth/reducer'
import screens from './screens/reducer'
import policies from './policies/reducer'
import insurers from './insurers/reducer'
import loading from './loading/reducer'
import errors from './errors/reducer'

const AppReducer = combineReducers({
  nav,
  auth,
  screens,
  policies,
  insurers,
  loading,
  errors
})

export default AppReducer
