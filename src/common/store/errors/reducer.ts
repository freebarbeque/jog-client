import { ErrorAction } from './actionTypes'

export interface IErrorsReduxState {
  error: boolean
  text: string
}

const DEFAULT_STATE = {
  error: false,
  text: '',
}

export default function reducer(
  state: IErrorsReduxState = DEFAULT_STATE,
  action: ErrorAction,
) {
  if (action.type === 'errors/DECLARE') {
    return {
      error: true,
      text: action.text,
    }
  } else if (action.type === 'errors/CLEAR') {
    return {
      error: false,
      text: '',
    }
  }
  return state
}
