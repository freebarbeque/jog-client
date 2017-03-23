// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type Action = {
  type: 'DUMMY_ACTION',
  dummy: number,
}

export type RootReduxState = {
  dummy: number,
}

export type Store = ReduxStore<RootReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;
