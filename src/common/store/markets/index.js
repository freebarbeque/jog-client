// @flow

//
// Action Types
//

import { fork, put, call, cancel, takeLatest, take } from 'redux-saga/effects'
import { eventChannel, cancelled } from 'redux-saga'

import type { Address } from '../../../business/types'
import { finishLoading, startLoading } from '../loading/actions'
import { setAddress, syncAddresses } from '../../data/quotes'
import { demandCurrentUser } from '../../data/auth'

// region Action types
export type SetAddressAnswerAction = {
  type: 'markets/addresses/SET_ADDRESS_ANSWER',
  key: string,
  value: string,
}

export type SetMotorAnswerAction = {
  type: 'markets/addresses/SET_MOTOR_ANSWER',
  key: string,
  value: mixed,
}

export type AddAddressAction = {
  type: 'markets/addresses/ADD_ADDRESS',
  address: Address,
}

export type SyncAddressesAction = {
  type: 'markets/addresses/SYNC_ADDRESSES',
  uid: string,
}

export type UnsyncAddressesAction = {
  type: 'markets/addresses/UNSYNC_ADDRESSES',
}

export type ReceiveAddressesAction = {
  type: 'markets/addresses/RECEIVE_ADDRESSES',
  addresses: { [string]: Address },
}

export type MarketsAction =
  | SetAddressAnswerAction
  | AddAddressAction
  | ReceiveAddressesAction
  | UnsyncAddressesAction
  | SyncAddressesAction
// endregion

// region Action creators
export function setAddressAnswer(
  key: string,
  value: string,
): SetAddressAnswerAction {
  return {
    type: 'markets/addresses/SET_ADDRESS_ANSWER',
    key,
    value,
  }
}

// region Action creators
export function setMotorAnswer(
  key: string,
  value: mixed,
): SetMotorAnswerAction {
  return {
    type: 'markets/addresses/SET_MOTOR_ANSWER',
    key,
    value,
  }
}

export function addAddress(address: Address): AddAddressAction {
  return {
    type: 'markets/addresses/ADD_ADDRESS',
    address,
  }
}

export function syncAddressesAction(uid: string): SyncAddressesAction {
  return {
    type: 'markets/addresses/SYNC_ADDRESSES',
    uid,
  }
}

export function unsyncAddressesAction(uid: string): UnsyncAddressesAction {
  return {
    type: 'markets/addresses/UNSYNC_ADDRESSES',
    uid,
  }
}
export function receiveAddresses(addresses: {
  [string]: Address,
}): ReceiveAddressesAction {
  return {
    type: 'markets/addresses/RECEIVE_ADDRESSES',
    addresses,
  }
}

// endregion

// region Sagas
export function* addAddressTask<T>(action: AddAddressAction): Iterable<T> {
  const address = action.address
  yield put(startLoading('Adding new address'))
  const user = demandCurrentUser()
  yield call(() => setAddress(user.uid, address))
  yield put(finishLoading())
}

export function* addAddressSaga<T>(): Iterable<T> {
  yield takeLatest('markets/addresses/ADD_ADDRESS', addAddressTask)
}

function addressEventChannel(uid: string) {
  return eventChannel(emitter =>
    syncAddresses(uid, addresses => {
      emitter(addresses)
    }),
  )
}

function* syncAddressesTask({ uid }) {
  const channel = yield call(addressEventChannel, uid)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const addresses = yield take(channel)
      console.log('syncMotorPoliciesTask received new policies', addresses)
      yield put(receiveAddresses(addresses))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncAddressesSaga<T>(): Iterable<T> {
  let action: ?SyncAddressesAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('markets/addresses/SYNC_ADDRESSES'))) {
    // Start the sync in the background
    const bgTask = yield fork(syncAddressesTask, action)

    // Wait for the sync to cancel
    yield take('markets/addresses/UNSYNC_ADDRESSES')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}
// endregion

// region State
export type MarketsReduxState = {
  addressAnswers: { [string]: string },
  motorAnswers: { [string]: mixed },
  addresses: { [string]: Address },
}

const DEFAULT_STATE: MarketsReduxState = {
  addressAnswers: {},
  addresses: {},
  motorAnswers: {},
}
// endregion

export default function reducer(
  state: MarketsReduxState = DEFAULT_STATE,
  action: MarketsAction,
): MarketsReduxState {
  if (action.type === 'markets/addresses/SET_ADDRESS_ANSWER') {
    const addressAnswers = { ...state.addressAnswers }
    addressAnswers[action.key] = action.value
    return {
      ...state,
      addressAnswers,
    }
  } else if (action.type === 'markets/addresses/SET_MOTOR_ANSWER') {
    const motorAnswers = { ...state.motorAnswers }
    motorAnswers[action.key] = action.value
    return {
      ...state,
      motorAnswers,
    }
  } else if (action.type === 'markets/addresses/RECEIVE_ADDRESSES') {
    return {
      ...state,
      addresses: action.addresses,
    }
  }

  return state
}
