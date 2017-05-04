// @flow

import type { ErrorAction } from './actionTypes'

export type ErrorsReduxState = {
  error: boolean,
  text: string,
}

const DEFAULT_STATE = {
  error: false,
  text: ''
}

export default function reducer(state: ErrorsReduxState = DEFAULT_STATE, action: ErrorAction) {
  if (action.type === 'errors/DECLARE') {
    console.log('yooo')
    return {
      error: true,
      text: action.text
    }
  } else if (action.type === 'errors/CLEAR') {
    return {
      error: false,
      text: ''
    }
  }
  return state
}
