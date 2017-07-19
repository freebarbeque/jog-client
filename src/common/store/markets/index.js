// @flow

//
// Action Types
//

import { put, call } from 'redux-saga/effects'

import type { Address } from '../../../business/types'
import { finishLoading, startLoading } from '../loading/actions'
import { setAddress } from '../../data/quotes'
import { demandCurrentUser } from '../../data/auth'

// region Action types
export type SetAddressAnswerAction = {
  type: 'markets/address/SET_ADDRESS_ANSWER',
  key: string,
  value: string,
}

export type AddAddressAction = {
  type: 'markets/addresses/ADD_ADDRESS',
  address: Address,
  id: string,
}

export type MarketsAction = SetAddressAnswerAction | AddAddressAction
// endregion

// region Action creators
export function setAddressAnswer(
  key: string,
  value: string,
): SetAddressAnswerAction {
  return {
    type: 'markets/address/SET_ADDRESS_ANSWER',
    key,
    value,
  }
}

export function addAddress(id: string, address: Address): AddAddressAction {
  return {
    type: 'markets/addresses/ADD_ADDRESS',
    id,
    address,
  }
}
// endregion

// region Sagas
export function* addAddressSaga<T>(action: AddAddressAction): Iterable<T> {
  const address = action.address
  yield put(startLoading('Adding new address'))
  const user = demandCurrentUser()
  yield call(() => setAddress(user.uid, action.id, address))
  yield put(finishLoading())
}
// endregion

// region State
export type MarketsReduxState = {
  addressAnswers: { [string]: string },
}

const DEFAULT_STATE: MarketsReduxState = {
  addressAnswers: {},
}
// endregion

export default function reducer(
  state: MarketsReduxState = DEFAULT_STATE,
  action: MarketsAction,
): MarketsReduxState {
  if (action.type === 'markets/address/SET_ADDRESS_ANSWER') {
    const addressAnswers = { ...state.addressAnswers }
    addressAnswers[action.key] = action.value
    return {
      ...state,
      addressAnswers,
    }
  }

  return state
}
