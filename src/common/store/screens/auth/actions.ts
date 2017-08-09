import { IFirebaseUser, IValidationErrorsMap, IValuesMap } from '../../../types'

export interface ILoginAction {
  type: 'screens/auth/LOGIN'
  email: string
  password: string
}

export interface IRegisterAction {
  type: 'screens/auth/REGISTER'
  name: string
  email: string
  password: string
}

export interface IPasswordResetAction {
  type: 'screens/auth/PASSWORD_RESET'
  email: string
}

interface ISetValuesAction {
  type: 'screens/auth/SET_VALUES'
  values: IValuesMap
}

interface ISetValidationErrors {
  type: 'screens/auth/SET_VALIDATION_ERRORS'
  validationErrors: IValidationErrorsMap
}

interface ISetLoadingAction {
  type: 'screens/auth/SET_LOADING'
  loading: boolean
}

interface ISetLoginErrorAction {
  type: 'screens/auth/SET_LOGIN_ERROR'
  loginError: string | null
}

interface ISetRegisterErrorAction {
  type: 'screens/auth/SET_REGISTER_ERROR'
  registerError: string | null
}

interface ISetPasswordResetErrorAction {
  type: 'screens/auth/SET_PASSWORD_RESET_ERROR'
  passwordResetError: string | null
}

interface IClearAction {
  type: 'screens/auth/CLEAR'
}

export interface ISendEmailVerificationEmailAction {
  type: 'screens/auth/SEND_VERIFICATION_EMAIL'
  user: IFirebaseUser
}

export type CommonAuthAction =
  | ISetValuesAction
  | ISetValidationErrors
  | ISetLoadingAction
  | ISetLoginErrorAction
  | ISetRegisterErrorAction
  | ISetPasswordResetErrorAction
  | ILoginAction
  | IRegisterAction
  | IPasswordResetAction
  | IClearAction
  | ISendEmailVerificationEmailAction

export function login(email: string, password: string): ILoginAction {
  return {
    type: 'screens/auth/LOGIN',
    email,
    password,
  }
}

export function passwordReset(email: string): IPasswordResetAction {
  return {
    type: 'screens/auth/PASSWORD_RESET',
    email,
  }
}

export function emailVerification(
  user: IFirebaseUser,
): ISendEmailVerificationEmailAction {
  return {
    type: 'screens/auth/SEND_VERIFICATION_EMAIL',
    user,
  }
}

export function register(
  name: string,
  email: string,
  password: string,
): IRegisterAction {
  return {
    type: 'screens/auth/REGISTER',
    name,
    email,
    password,
  }
}

export function setValues(values: IValuesMap): ISetValuesAction {
  return {
    type: 'screens/auth/SET_VALUES',
    values,
  }
}

export function setValidationErrors(
  validationErrors: IValidationErrorsMap,
): ISetValidationErrors {
  return {
    type: 'screens/auth/SET_VALIDATION_ERRORS',
    validationErrors,
  }
}

export function setLoading(loading: boolean): ISetLoadingAction {
  return {
    type: 'screens/auth/SET_LOADING',
    loading,
  }
}

export function setLoginError(loginError: string | null): ISetLoginErrorAction {
  return {
    type: 'screens/auth/SET_LOGIN_ERROR',
    loginError,
  }
}

export function setRegisterError(
  registerError: string | null,
): ISetRegisterErrorAction {
  return {
    type: 'screens/auth/SET_REGISTER_ERROR',
    registerError,
  }
}

export function setPasswordResetError(
  passwordResetError: string | null,
): ISetPasswordResetErrorAction {
  return {
    type: 'screens/auth/SET_PASSWORD_RESET_ERROR',
    passwordResetError,
  }
}

export function clear(): IClearAction {
  return {
    type: 'screens/auth/CLEAR',
  }
}
