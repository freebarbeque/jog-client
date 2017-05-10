// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { NavigationAction } from 'react-navigation'
import type { AuthAction } from './store/auth/actionTypes'
import type { PoliciesAction } from './store/policies/actionTypes'
import type { InsurerActions } from './store/insurers/actionTypes'
import type { BaseAction } from './store/actionTypes'
import type { LoadingReduxState } from './store/loading/reducer'
import type { LoadingAction } from './store/loading/actionTypes'
import type { ErrorsReduxState } from './store/errors/reducer'
import type { ErrorAction } from './store/errors/actionTypes'
import type {
  AddManualPolicyAction, ManualPolicyUpdate, MotorPolicyOwnership
} from './store/screens/addManualPolicy/actions'

//
// Redux
//

export type Action =
  AuthAction |
  NavigationAction |
  PoliciesAction |
  InsurerActions |
  BaseAction |
  LoadingAction |
  ErrorAction |
  AddManualPolicyAction

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
  auth: AuthScreensReduxState,
  addManualPolicy: ManualPolicyUpdate,
}

export type MotorPolicyMap = {[id: string]: MotorPolicy}

export type PoliciesState = {
  initialised: boolean,
  policies: MotorPolicyMap,
}

export type ReduxState = {
  nav: NavReduxState,
  auth: AuthReduxState,
  screens: ScreensReduxState,
  policies: PoliciesState,
  insurers: InsurersReduxState,
  loading: LoadingReduxState,
  errors: ErrorsReduxState,
}

export type Store = ReduxStore<ReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;

//
// Forms
//

export type TextFormField = {
  type: 'text',
  inputProps: $Subtype<Object>,
  label: string,
  key: string,
  // The validation function should return an error if invalid or null if valid.
  validate?: (val: string) => string | null,
}

export type OptionsFormField = {
  type: 'options',
  label: string,
  key: string,
  options: {value: string, label: string}[]
}

export type FormField = TextFormField | OptionsFormField

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
  uid: string
}

//
// Motor Policies
//

// Describes a driver attached to a motor policy
export type Driver = {
  firstName?: string,
  lastName?: string,
}

export const LEVEL_OF_COVER = {
  comprehensive: 'Comprehensive',
  tpft: 'Third Party, Fire & Theft',
  thirdParty: 'Third Party Only',
}

export type PolicyDocument = {
  image: string,
  name: string,
  id: string,
  extension: string
}

// TODO: Split this into generic Policy/MotorPolicy/SelectedMotorPolicy once react-native supports flow 0.42.x
// /policies/${policyId}
export type MotorPolicy = {
  type?: 'motor',
  vehicleRegistration?: string,
  levelOfCover?: $Keys<typeof LEVEL_OF_COVER>,
  drivers?: Driver[],
  noClaimsBonus?: number, // Num. years.
  id?: string, // Jogs identifier for the policy (guid?)
  policyNo?: string, // I would assume this is the insurer's own identifier? I know some will have non-numeric characters
  expiryDate?: number,
  startDate?: number,
  createdDate?: number, // Date added to jog as opposed to insurance start date
  companyId?: string,
  documents?: {[id: string] : PolicyDocument},
  cost?: number,
  uid?: string, // Firebase user id.
  excess?: number,
  // reselect
  companyLogo?: string | null,
  companyName?: string | null,
  name?: string,
  ownership?: MotorPolicyOwnership
}

//
// Insurers
//

export type Insurer = {
  name?: string,
  logo?: string
}

export type InsurerMap = {[id: string]: Insurer}

export type InsurersReduxState = {
  initialised: boolean,
  insurers: InsurerMap
}

//
// React Navigation
//

// navigation
export type ReactNavigationProp = {
  navigate: (routeName: string) => void,
  dispatch: Dispatch,
  goBack: () => void,
  state: {
    index: number,
    params: {
      [key: string]: any
    },
    key: string, // Unique key for the route
    type: string,
    routes: Route[]
  },
}

export type Route = {
  key: string,
  index: number,
  routeName: string,
  routes: Route[]
}

// nav
export type ReactNavProp = {
  routes: Route[]
}

