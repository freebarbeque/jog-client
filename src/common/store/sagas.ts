import { put, takeLatest } from 'redux-saga/effects'
import { syncMotorPolicies, unsyncMotorPolicies } from './policies/actions'
import { syncInsurers } from './insurers/actions'
import { syncUser } from './auth/actions'
import {
  syncAddressesAction,
  syncDriversAction,
  unsyncAddressesAction,
  unsyncDriversAction,
} from './markets/index'
import { SyncUserDataAction } from './actionTypes'

function* syncUserData(action: SyncUserDataAction) {
  const { uid } = action
  yield put(syncMotorPolicies(uid))
  yield put(syncAddressesAction(uid))
  yield put(syncDriversAction(uid))
}

function* unsyncUserData() {
  yield put(unsyncMotorPolicies())
  yield put(unsyncAddressesAction())
  yield put(unsyncDriversAction())
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
