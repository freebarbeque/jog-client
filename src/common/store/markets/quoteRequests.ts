import { IQuoteRequest } from 'jog-common/business/types'

import * as _ from 'lodash'

import { call } from 'redux-saga/effects'
import { demandCurrentUser } from '../../data/auth'
import {
  constructAddTask,
  constructDeleteTask,
  constructSyncSaga,
} from '../../sagaHelpers/index'

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

export interface IDeleteQuoteRequestAction {
  type: 'markets/quoteRequests/DELETE_QUOTE_REQUEST'
  id: string
}

export type QuoteRequestAction =
  | IAddQuoteRequest
  | ISyncQuoteRequests
  | IUnsyncQuoteRequestsAction
  | IReceiveQuoteRequestsAction
  | IDeleteQuoteRequestAction

//
// Action Creators
//

export function deleteQuoteRequest(id: string): IDeleteQuoteRequestAction {
  return {
    type: 'markets/quoteRequests/DELETE_QUOTE_REQUEST',
    id,
  }
}

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

// const getQuotes = function*(action) {
//   yield put({ type: 'markets/getQuotes/REQUEST' })
//   try {
//     yield call(() =>
//       fetch(`${env.webApiEndpoint}/getQuotes/${action.quoteRequest.id}`, {
//         method: 'GET',
//         headers: {
//           token: _.get(demandCurrentUser(), 'stsTokenManager.accessToken'),
//         },
//       }),
//     )
//     yield put({ type: 'markets/getQuotes/SUCCESS' })
//   } catch (error) {
//     yield put({ type: 'markets/getQuotes/ERROR', payload: error })
//   }
// }

export const addQuoteRequestTask = function*(action) {
  const addQuoteToFirebase = constructAddTask(
    (addAction: any) =>
      `quoteRequest/${demandCurrentUser().uid}/${addAction.quoteRequest.id}`,
    'quoteRequest',
    (addAction: any) => _.get(addAction, 'back'),
  )
  yield call(() => addQuoteToFirebase(action))
  // yield call(() => getQuotes(action))
}

export const deleteQuoteRequestTask = constructDeleteTask(
  (action: any) => `quoteRequest/${demandCurrentUser().uid}/${action.id}`,
)

export const quoteRequestsSyncSaga = constructSyncSaga({
  key: () => `quoteRequest/${demandCurrentUser().uid}`,
  receiveActionCreator: receiveQuoteRequests,
  syncActionType: 'markets/quoteRequests/SYNC_QUOTE_REQUESTS',
  unsyncActionType: 'markets/quoteRequests/UNYNC_QUOTE_REQUESTS',
})
