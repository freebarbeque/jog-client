import { NavigationAction } from 'react-navigation'
import { RouterAction } from 'react-router-redux'
import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'
import { PushNotificationsReduxState } from '../native/store/push/reducer'
import { DimensionAction } from '../web/store/dimensions/actionTypes'
import { BaseAction } from './store/actionTypes'
import { AuthAction } from './store/auth/actionTypes'
import { ErrorAction } from './store/errors/actionTypes'
import { ErrorsReduxState } from './store/errors/reducer'
import { InsurerActions } from './store/insurers/actionTypes'
import { LoadingAction } from './store/loading/actionTypes'
import { LoadingReduxState } from './store/loading/reducer'
import { MarketsAction, IMarketsReduxState } from './store/markets/index'
import { QuoteRequestAction } from './store/markets/quoteRequests'
import { PoliciesAction } from './store/policies/actionTypes'
import {
  AddManualPolicyAction,
  ManualPolicyUpdate,
  MotorPolicyOwnership,
} from './store/screens/addManualPolicy/actions'
import { CommonAuthAction } from './store/screens/auth/actions'
import { SettingsScreenReduxState } from './store/screens/settings/reducer'

//
// Redux
//

export type Action =
  | AuthAction
  | NavigationAction
  | PoliciesAction
  | InsurerActions
  | BaseAction
  | LoadingAction
  | ErrorAction
  | AddManualPolicyAction
  | MarketsAction
  | DimensionAction
  | CommonAuthAction
  | RouterAction

export interface NavReduxState {
  index: number
  routes: Route[]
}

export interface AuthReduxState {
  user: FirebaseUser | null
  details: UserDetails | null
  initialised: boolean
}

export interface DimensionsReduxState {
  width: number
  height: number
}

export interface AuthScreensReduxState {
  values: ValuesMap
  validationErrors: ValidationErrorsMap
  loading: boolean
  errors: { [key: string]: string }
}

export interface ScreensReduxState {
  auth: AuthScreensReduxState
  addManualPolicy: ManualPolicyUpdate
  settings: SettingsScreenReduxState
}

export interface MotorPolicyMap {
  [id: string]: MotorPolicy
}

export interface PoliciesState {
  initialised: boolean
  policies: MotorPolicyMap
}

export interface ReduxState {
  nav: NavReduxState
  auth: AuthReduxState
  screens: ScreensReduxState
  policies: PoliciesState
  insurers: InsurersReduxState
  loading: LoadingReduxState
  errors: ErrorsReduxState
  push: PushNotificationsReduxState
  dimensions: DimensionsReduxState
  markets: IMarketsReduxState
}

export type Store = ReduxStore<ReduxState>

export type Dispatch = (a: Action) => void

//
// Forms
//

export interface TextFormField {
  type: 'text'
  inputProps: Object
  label: string
  key: string
  // The validation function should return an error if invalid or null if valid.
  validate?: (val: string) => string | null
}

export interface OptionsFormField {
  type: 'options'
  label: string
  key: string
  options: Array<{ value: string; label: string }>
}

export type FormField = TextFormField | OptionsFormField

export interface ValuesMap {
  [key: string]: string
}
export interface ValidationErrorsMap {
  [key: string]: string | null
}

//
// Firebase
//

// https://firebase.google.com/docs/reference/js/firebase.User
export interface FirebaseUser {
  displayName: string | null
  email: string | null
  emailVerified: boolean
  isAnonymous: boolean
  photoURL: string | null
  providerId: 'facebook.com' | 'google.com'
  refreshToken: string
  uid: string
}

export interface UserDetails {
  firstName?: string
  lastName?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    postCode?: string
  }
  dob?: string
  profilePhoto?: string
  os?: 'android' | 'ios'
  // Computed
  profilePhotoURL?: string
  fcmToken?: string | null
  enableNotifications?: boolean
}

//
// Motor Policies
//

// Describes a driver attached to a motor policy
export interface Driver {
  firstName?: string
  lastName?: string
}

export const LEVEL_OF_COVER = {
  comprehensive: 'Comprehensive',
  tpft: 'Third Party, Fire & Theft',
  thirdParty: 'Third Party Only',
}

export interface PolicyDocument {
  image: string
  name: string
  id: string
  extension: string
}

// TODO: Split this into generic Policy/MotorPolicy/SelectedMotorPolicy once react-native supports flow 0.42.x
// /policies/${policyId}
export interface MotorPolicy {
  type?: 'motor'
  vehicleRegistration?: string
  levelOfCover?: keyof typeof LEVEL_OF_COVER
  drivers?: Driver[]
  noClaimsBonus?: number // Num. years.
  id?: string // Jogs identifier for the policy (guid?)
  policyNo?: string // I would assume this is the insurer's own identifier? I know some will have non-numeric characters
  expiryDate?: number
  startDate?: number
  createdDate?: number // Date added to jog as opposed to insurance start date
  companyId?: string
  documents?: { [id: string]: PolicyDocument }
  cost?: number
  uid?: string // Firebase user id.
  excess?: number
  // reselect
  companyLogo?: string | null
  companyName?: string | null
  name?: string
  ownership?: MotorPolicyOwnership
  notifications?: {
    expiry?: number
    expired?: number
  }
  complete?: boolean
}

//
// Insurers
//

export interface Insurer {
  name?: string
  logo?: string
}

export interface InsurerMap {
  [id: string]: Insurer
}

export interface InsurersReduxState {
  initialised: boolean
  insurers: InsurerMap
}

//
// React Navigation
//

// navigation
export interface ReactNavigationProp {
  navigate: (routeName: string) => void
  dispatch: Dispatch
  goBack: () => void
  state: {
    index: number
    params: {
      [key: string]: any
    }
    key: string // Unique key for the route
    type: string
    routes: Route[]
  }
}

export interface Route {
  key: string
  index?: number
  routeName: string
  routes: Route[]
  params: { [key: string]: any }
}

// nav
export interface ReactNavProp {
  routes: Route[]
}

export interface UploadFileOpts {
  filePath?: string
  file?: any
  fileStoragePath: string
  contentType: string
  contentEncoding: string
}

export interface EnvironmentConfig {
  firebase: {
    apiKey: string
    authDomain: string
    databaseURL: string
    storageBucket: string
    messagingSenderId: string
  }
  firestack?: {
    APIKey: string
    databaseURL: string
    storageBucket: string
    GCMSenderID: string
    clientID: string
    bundleID: string
    debug: boolean
    googleAppID: string
  }
}
