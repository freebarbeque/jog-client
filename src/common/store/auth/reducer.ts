// @flow

import { AuthReduxState } from '../../types'
import { AuthAction } from './actionTypes'

const DEFAULT_STATE = { user: null, details: null, initialised: false }

export default function reducer(
  state: AuthReduxState = DEFAULT_STATE,
  action: AuthAction,
): AuthReduxState {
  if (action.type === 'auth/RECEIVE_USER') {
    return {
      ...state,
      user: action.user,
      initialised: true,
    }
  } else if (action.type === 'auth/RECEIVE_USER_DETAILS') {
    return {
      ...state,
      details: action.details,
    }
  }
  return state
}
