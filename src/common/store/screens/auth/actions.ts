import { FirebaseUser, ValidationErrorsMap, ValuesMap } from '../../../types'

export interface LoginAction {
  type: 'screens/auth/LOGIN'
  email: string
  password: string
}

export interface RegisterAction {
  type: 'screens/auth/REGISTER'
  name: string
  email: string
  password: string
}

export interface PasswordResetAction {
  type: 'screens/auth/PASSWORD_RESET'
  email: string
}

interface SetValuesAction {
  type: 'screens/auth/SET_VALUES'
  values: ValuesMap
}

interface SetValidationErrors {
  type: 'screens/auth/SET_VALIDATION_ERRORS'
  validationErrors: ValidationErrorsMap
}

interface SetLoadingAction {
  type: 'screens/auth/SET_LOADING'
  loading: boolean
}

interface SetLoginErrorAction {
  type: 'screens/auth/SET_LOGIN_ERROR'
  loginError: string | null
}

interface SetRegisterErrorAction {
  type: 'screens/auth/SET_REGISTER_ERROR'
  registerError: string | null
}

interface SetPasswordResetErrorAction {
  type: 'screens/auth/SET_PASSWORD_RESET_ERROR'
  passwordResetError: string | null
}

interface ClearAction {
  type: 'screens/auth/CLEAR'
}

export interface SendEmailVerificationEmailAction {
  type: 'screens/auth/SEND_VERIFICATION_EMAIL'
  user: FirebaseUser
}

export type CommonAuthAction =
  | SetValuesAction
  | SetValidationErrors
  | SetLoadingAction
  | SetLoginErrorAction
  | SetRegisterErrorAction
  | SetPasswordResetErrorAction
  | LoginAction
  | RegisterAction
  | PasswordResetAction
  | ClearAction
  | SendEmailVerificationEmailAction

export function login(email: string, password: string): LoginAction {
  return {
    type: 'screens/auth/LOGIN',
    email,
    password,
  }
}

export function passwordReset(email: string): PasswordResetAction {
  return {
    type: 'screens/auth/PASSWORD_RESET',
    email,
  }
}

export function emailVerification(
  user: FirebaseUser,
): SendEmailVerificationEmailAction {
  return {
    type: 'screens/auth/SEND_VERIFICATION_EMAIL',
    user,
  }
}

export function register(
  name: string,
  email: string,
  password: string,
): RegisterAction {
  return {
    type: 'screens/auth/REGISTER',
    name,
    email,
    password,
  }
}

export function setValues(values: ValuesMap): SetValuesAction {
  return {
    type: 'screens/auth/SET_VALUES',
    values,
  }
}

export function setValidationErrors(
  validationErrors: ValidationErrorsMap,
): SetValidationErrors {
  return {
    type: 'screens/auth/SET_VALIDATION_ERRORS',
    validationErrors,
  }
}

export function setLoading(loading: boolean): SetLoadingAction {
  return {
    type: 'screens/auth/SET_LOADING',
    loading,
  }
}

export function setLoginError(loginError: string | null): SetLoginErrorAction {
  return {
    type: 'screens/auth/SET_LOGIN_ERROR',
    loginError,
  }
}

export function setRegisterError(
  registerError: string | null,
): SetRegisterErrorAction {
  return {
    type: 'screens/auth/SET_REGISTER_ERROR',
    registerError,
  }
}

export function setPasswordResetError(
  passwordResetError: string | null,
): SetPasswordResetErrorAction {
  return {
    type: 'screens/auth/SET_PASSWORD_RESET_ERROR',
    passwordResetError,
  }
}

export function clear(): ClearAction {
  return {
    type: 'screens/auth/CLEAR',
  }
}
