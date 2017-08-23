import { NavigationAction } from 'react-navigation'
import { RouterAction } from 'react-router-redux'
import { Store as ReduxStore } from 'redux'
import { IPushNotificationsReduxState } from '../native/store/push/reducer'
import { DimensionAction } from '../web/store/dimensions/actionTypes'
import { BaseAction } from './store/actionTypes'
import { AuthAction } from './store/auth/actionTypes'
import { ErrorAction } from './store/errors/actionTypes'
import { IErrorsReduxState } from './store/errors/reducer'
import { InsurerActions } from './store/insurers/actionTypes'
import { LoadingAction } from './store/loading/actionTypes'
import { ILoadingReduxState } from './store/loading/reducer'
import { IMarketsReduxState, MarketsAction } from './store/markets/index'
import { PoliciesAction } from './store/policies/actionTypes'
import {
  AddManualPolicyAction,
  IManualPolicyUpdate,
  MotorPolicyOwnership,
} from './store/screens/addManualPolicy/actions'
import { CommonAuthAction } from './store/screens/auth/actions'
import { ISettingsScreenReduxState } from './store/screens/settings/reducer'

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

export interface INavReduxState {
  index: number
  routes: IRoute[]
}

export interface IAuthReduxState {
  user: IFirebaseUser | null
  details: IUserDetails | null
  initialised: boolean
}

export interface IDimensionsReduxState {
  width: number
  height: number
}

export interface IAuthScreensReduxState {
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  loading: boolean
  errors: { [key: string]: string }
}

export interface IScreensReduxState {
  auth: IAuthScreensReduxState
  addManualPolicy: IManualPolicyUpdate
  settings: ISettingsScreenReduxState
}

export interface IMotorPolicyMap {
  [id: string]: IMotorPolicy
}

export interface IPoliciesState {
  initialised: boolean
  policies: IMotorPolicyMap
}

export interface IReduxState {
  nav: INavReduxState
  auth: IAuthReduxState
  screens: IScreensReduxState
  policies: IPoliciesState
  insurers: InsurersReduxState
  loading: ILoadingReduxState
  errors: IErrorsReduxState
  push: IPushNotificationsReduxState
  dimensions: IDimensionsReduxState
  markets: IMarketsReduxState
}

export type Store = ReduxStore<IReduxState>

export type Dispatch = (a: Action) => void

//
// Forms
//

export interface ITextFormField {
  type: 'text'
  inputProps: any
  label: string
  key: string
  // The validation function should return an error if invalid or null if valid.
  validate?: (val: string) => string | null
}

export interface IOptionsFormField {
  type: 'options'
  label: string
  key: string
  options: Array<{ value: string; label: string }>
}

export type FormField = ITextFormField | IOptionsFormField

export interface IValuesMap {
  [key: string]: string
}
export interface IValidationErrorsMap {
  [key: string]: string | null
}

//
// Firebase
//

// https://firebase.google.com/docs/reference/js/firebase.User
export interface IFirebaseUser {
  displayName: string | null
  email: string | null
  emailVerified: boolean
  isAnonymous: boolean
  photoURL: string | null
  providerId: 'facebook.com' | 'google.com'
  refreshToken: string
  uid: string
}

export interface IUserDetails {
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
export interface IDriver {
  firstName?: string
  lastName?: string
}

export const LEVEL_OF_COVER = {
  comprehensive: 'Comprehensive',
  tpft: 'Third Party, Fire & Theft',
  thirdParty: 'Third Party Only',
}

export interface IPolicyDocument {
  image: string
  name: string
  id: string
  extension: string
}

// TODO: Split this into generic Policy/MotorPolicy/SelectedMotorPolicy once react-native supports flow 0.42.x
// /policies/${policyId}
export interface IMotorPolicy {
  type?: 'motor'
  vehicleRegistration?: string
  levelOfCover?: keyof typeof LEVEL_OF_COVER
  drivers?: IDriver[]
  noClaimsBonus?: number // Num. years.
  id?: string // Jogs identifier for the policy (guid?)
  policyNo?: string // I would assume this is the insurer's own identifier? I know some will have non-numeric characters
  expiryDate?: number
  startDate?: number
  createdDate?: number // Date added to jog as opposed to insurance start date
  companyId?: string
  documents?: { [id: string]: IPolicyDocument }
  cost?: number | null
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
export interface IReactNavigationProp {
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
    routes: IRoute[]
  }
}

export interface IRoute {
  key: string
  index?: number
  routeName: string
  routes: IRoute[]
  params: { [key: string]: any }
}

// nav
export interface IReactNavProp {
  routes: IRoute[]
}

export interface IUploadFileOpts {
  filePath?: string
  file?: any
  fileStoragePath: string
  contentType: string
  contentEncoding: string
}

export interface IEnvironmentConfig {
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
