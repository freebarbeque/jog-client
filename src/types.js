// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { NavigationAction } from 'react-navigation'
import type { AuthAction } from './redux/auth/actionTypes'
import type { PoliciesAction } from './redux/policies/actionTypes'

//
// Redux
//

export type Action = AuthAction | NavigationAction | PoliciesAction

export type NavReduxState = {
  index: number,
  routes: Route[]
}

export type AuthReduxState = {
  user: FirebaseUser | null
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

export type PoliciesState = MotorPolicy[]

export type ReduxState = {
  nav: NavReduxState,
  auth: AuthReduxState,
  screens: ScreensReduxState,
  policies: PoliciesState
}

export type Store = ReduxStore<ReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;

//
// Forms
//

export type FormField = {
  inputProps: $Subtype<Object>,
  label: string,
  key: string,
  // The validation function should return an error if invalid or null if valid.
  validate?: (val: string) => string | null,
}

export type ValuesMap = {[key: string] : string}
export type ValidationErrorsMap = {[key: string]: string | null}

//
// Firebase
//

// https://firebase.google.com/docs/reference/js/firebase.User
export type FirebaseUser = {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  isAnonymous: boolean,
  photoURL: string | null,
  providerId: 'facebook.com' | 'google.com',
  refreshToken: string,
  uid: string,
}

//
// Motor Policies
//

// Describes a driver attached to a motor policy
export type Driver = {
  firstNames: string,
  lastName: string,
}

export type Policy = {
  policyId: string, // Jogs identifier for the policy (guid?)
  policyNo: string, // I would assume this is the insurer's own identifier? I know some will have non-numeric characters
  expiryDate: number,
  startDate: number,
  jogCreatedDate: number, // Date added to jog as opposed to insurance start date
  companyId: string,
  documentPaths: string[], // Paths on firebase storage.
  uid: string, // Firebase user id.
  excess: number,
}

// /policies/${policyId}
export type MotorPolicy = Policy & {
  type: 'motor',
  vehicleRegistration: string,
  levelOfCover: 'comprehensive' | 'tpft' | 'third-party',
  drivers: Driver[],
  noClaimsBonus: number, // Num. years.
  milesPerYear: number,
}

//
// React Navigation
//

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

