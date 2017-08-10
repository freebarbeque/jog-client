import { IAuthScreensReduxState } from '../../../types'
import { CommonAuthAction } from './actions'

const DEFAULT_STATE = {
  values: {},
  validationErrors: {},
  loading: false,
  errors: {},
}

export default function reducer(
  state: IAuthScreensReduxState = DEFAULT_STATE,
  action: CommonAuthAction,
): IAuthScreensReduxState {
  if (action.type === 'screens/auth/SET_VALUES') {
    return {
      ...state,
      values: action.values,
    }
  } else if (action.type === 'screens/auth/SET_VALIDATION_ERRORS') {
    return {
      ...state,
      validationErrors: action.validationErrors,
    }
  } else if (action.type === 'screens/auth/SET_LOADING') {
    return {
      ...state,
      loading: action.loading,
    }
  } else if (action.type === 'screens/auth/CLEAR') {
    return DEFAULT_STATE
  } else if (action.type === 'screens/auth/SET_LOGIN_ERROR') {
    if (action.loginError)
      return {
        ...state,
        errors: { ...state.errors, loginError: action.loginError },
      }
  } else if (action.type === 'screens/auth/SET_REGISTER_ERROR') {
    if (action.registerError)
      return {
        ...state,
        errors: { ...state.errors, registerError: action.registerError },
      }
  } else if (action.type === 'screens/auth/SET_PASSWORD_RESET_ERROR') {
    if (action.passwordResetError)
      return {
        ...state,
        errors: {
          ...state.errors,
          passwordResetError: action.passwordResetError,
        },
      }
  }
  return state
}
