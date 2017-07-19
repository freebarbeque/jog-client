import { combineReducers } from 'redux'

import auth from './auth/reducer'
import screens from './screens/reducer'
import policies from './policies/reducer'
import markets from './markets'
import insurers from './insurers/reducer'
import loading from './loading/reducer'
import errors from './errors/reducer'

export const coreReducers = {
  auth,
  screens,
  policies,
  markets,
  insurers,
  loading,
  errors,
}

export function initReducer(reducers = {}) {
  return combineReducers({
    ...reducers,
    ...coreReducers,
  })
}
