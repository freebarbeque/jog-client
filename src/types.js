// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { NavigationAction } from 'react-navigation'
import type { AuthAction } from './redux/auth/actionTypes'

//
// Redux
//

export type Action = AuthAction | NavigationAction

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

export type ReduxState = {
  nav: NavReduxState,
  auth: AuthReduxState,
  screens: ScreensReduxState
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

export type Conviction = {
  date: number,
  // Driving conviction codes: https://en.wikipedia.org/wiki/List_of_UK_driving_licence_endorsements
  type: 'SP30' | 'AC10' | 'BA10'
}

// Describes a driver attached to a motor policy
export type Driver = {
  firstNames: string,
  lastName: string,
  dob: number,
  main: boolean, // Is this the main driver on the policy?
  convictions: Conviction[],
  penaltyPoints: number,
  licenseNumber: string,
  licenseStartDate: string,
  everSuspendend: boolean,
}

// /policies/${policyId}
export type MotorPolicy = {
  policyId: string, // Jogs identifier for the policy (guid?)
  policyNo: string, // I would assume this is the insurer's own identifier? I know some will have non-numeric characters
  vehicleRegistration: string,
  expiryDate: number,
  startDate: number,
  jogCreatedDate: number, // Date added to jog as opposed to insurance start date
  companyId: string,
  levelOfCover: 'comprehensive' | 'tpft' | 'third-party',
  excess: number,
  drivers: Driver[],
  noClaimsBonus: number, // Num. years.
  documentPaths: string[], // Paths on firebase storage.
  uid: string, // Firebase user id.
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

