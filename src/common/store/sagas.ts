import { put, takeLatest } from 'redux-saga/effects'
import { ISyncUserDataAction } from './actionTypes'
import { syncUser } from './auth/actions'
import { syncInsurers } from './insurers/actions'
import {
  syncAddressesAction,
  syncCarsAction,
  syncDriversAction,
  unsyncAddressesAction,
  unsyncCarsAction,
  unsyncDriversAction,
} from './markets/index'
import { syncQuoteRequests, unsyncQuoteRequests } from './markets/quoteRequests'
import { syncMotorPolicies, unsyncMotorPolicies } from './policies/actions'

function* syncUserData(action: ISyncUserDataAction) {
  const { uid } = action
  yield put(syncMotorPolicies(uid))
  yield put(syncAddressesAction(uid))
  yield put(syncDriversAction(uid))
  yield put(syncCarsAction(uid))
  yield put(syncQuoteRequests())
}

function* unsyncUserData() {
  yield put(unsyncMotorPolicies())
  yield put(unsyncAddressesAction())
  yield put(unsyncDriversAction())
  yield put(unsyncCarsAction())
  yield put(unsyncQuoteRequests())
}

/**
 * Subscribe to data that is NOT dependent on the current user.
 */
function* syncNonUserDependantData() {
  yield put(syncInsurers())
  yield put(syncUser())
}

export default function* saga() {
  yield takeLatest('SYNC_USER_DATA', syncUserData)
  yield takeLatest('SYNC_DATA', syncNonUserDependantData)
  yield takeLatest('UNSYNC_USER_DATA', unsyncUserData)
}
