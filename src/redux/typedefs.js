// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { User } from 'jog/src/data/typedefs'

export type Action = {
  type: 'DUMMY_ACTION',
  dummy: number,
} | {
  type: 'RECEIVE_USER',
  user: User | null
}

export type RootReduxState = {
  dummy: number,
  user: User | null,
}

export type Store = ReduxStore<RootReduxState, Action>;

export type Dispatch = ReduxDispatch<Action>;
