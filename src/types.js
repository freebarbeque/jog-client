// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { NavigationAction } from 'react-navigation'
import type { AuthAction } from './redux/auth/actionTypes'

/* Redux */

export type Action = AuthAction | NavigationAction

export type NavReduxState = {
  index: number,
  routes: Route[]
}

export type AuthReduxState = {
  user: FirebaseUser | null,
  initialised: boolean,
}

export type AuthScreensReduxState = {
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  loading: boolean,
  errors: {[key: string]: string},
}

export type ScreensReduxState = {
  auth: AuthScreensReduxState
}

export type ReduxState = {
  nav: NavReduxState,
  auth: AuthReduxState,
  screens: ScreensReduxState
}

export type Store = ReduxStore<ReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;

/* Forms */

export type FormField = {
  inputProps: $Subtype<Object>,
  label: string,
  key: string,
  // The validation function should return an error if invalid or null if valid.
  validate?: (val: string) => string | null,
}

/* Firebase */

// https://firebase.google.com/docs/reference/js/firebase.User
export type FirebaseUser = {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  isAnonymous: boolean,
  photoURL: string | null,
  providerId: 'facebook.com' | 'google.com',
  refreshToken: string,
  uid: string
}

/* react-navigation */

// navigation
export type ReactNavigationProp = {
  navigate: (routeName: string) => void,
  goBack: () => void,
}

export type Route = {
  key: string,
  routeName: string
}

// nav
export type ReactNavProp = {
  routes: Route[]
}

//
// Forms
//

export type ValuesMap = {[key: string] : string}
export type ValidationErrorsMap = {[key: string]: string | null}
