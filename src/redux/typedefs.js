// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { AuthAction } from './auth/actionTypes'
import type { AuthReduxState } from './auth/reducer'

export type Action = AuthAction

export type Route = {
  key: string,
  routeName: string,
}

export type RootReduxState = {
  nav: {
    index: number,
    routes: Route[],
  },
  auth: AuthReduxState,
}

export type Store = ReduxStore<RootReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;
