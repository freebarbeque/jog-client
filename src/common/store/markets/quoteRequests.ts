import { eventChannel } from 'redux-saga'

import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects'

import { goBack } from 'react-router-redux'
import { Address, Car, IQuoteRequest, Person } from '../../../business/types'
import { demandCurrentUser } from '../../data/auth'
import {
  setAddress,
  setCar,
  setPerson,
  syncCars,
  syncPeople,
} from '../../data/quotes'
import { constructAddTask, constructSyncSaga } from '../../sagaHelpers/index'
import { finishLoading, startLoading } from '../loading/actions'

//
// Action Types
//

export interface IAddQuoteRequest {
  type: 'markets/quoteRequests/ADD_QUOTE_REQUEST'
  quoteRequest: IQuoteRequest
  id: string
  back?: boolean
}

export interface ISyncQuoteRequests {
  type: 'markets/quoteRequests/SYNC_QUOTE_REQUESTS'
}

export interface IUnsyncQuoteRequestsAction {
  type: 'markets/quoteRequests/UNSYNC_QUOTE_REQUESTS'
}

export interface IReceiveQuoteRequestsAction {
  type: 'markets/quoteRequests/RECEIVE_QUOTE_REQUESTS'
  quoteRequests: { [id: string]: IQuoteRequest }
}
export type QuoteRequestAction =
  | IAddQuoteRequest
  | ISyncQuoteRequests
  | IUnsyncQuoteRequestsAction
  | IReceiveQuoteRequestsAction

//
// Action Creators
//

export function addQuoteRequest(
  quoteRequest: IQuoteRequest,
  id: string,
  back: boolean = false,
): IAddQuoteRequest {
  return {
    quoteRequest,
    type: 'markets/quoteRequests/ADD_QUOTE_REQUEST',
    id,
    back,
  }
}

export function syncQuoteRequests(): ISyncQuoteRequests {
  return {
    type: 'markets/quoteRequests/SYNC_QUOTE_REQUESTS',
  }
}

export function unsyncQuoteRequests(): IUnsyncQuoteRequestsAction {
  return {
    type: 'markets/quoteRequests/UNSYNC_QUOTE_REQUESTS',
  }
}

export function receiveQuoteRequests(quoteRequests: {
  [id: string]: IQuoteRequest
}): IReceiveQuoteRequestsAction {
  return {
    quoteRequests,
    type: 'markets/quoteRequests/RECEIVE_QUOTE_REQUESTS',
  }
}

//
// Sagas & Tasks
//

const keyGen = () => `quoteRequest/${demandCurrentUser().uid}`

export const addQuoteRequestTask = constructAddTask(
  (action: any) =>
    `quoteRequest/${demandCurrentUser().uid}/${action.quoteRequest.id}`,
  'quoteRequest',
  (action: any) => action.goBack,
)

export const quoteRequestsSyncSaga = constructSyncSaga({
  key: () => `quoteRequest/${demandCurrentUser().uid}`,
  receiveActionCreator: receiveQuoteRequests,
  syncActionType: 'markets/quoteRequests/SYNC_QUOTE_REQUESTS',
  unsyncActionType: 'markets/quoteRequests/UNYNC_QUOTE_REQUESTS',
})
