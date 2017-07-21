import { put, takeLatest } from 'redux-saga/effects'
import { syncMotorPolicies, unsyncMotorPolicies } from './policies/actions'
import { syncInsurers } from './insurers/actions'
import { syncUser } from './auth/actions'
import { syncAddressesAction, unsyncAddressesAction } from './markets/index'

function* syncUserData({ uid }) {
  yield put(syncMotorPolicies(uid))
  yield put(syncAddressesAction(uid))
}

function* unsyncUserData({ uid }) {
  yield put(unsyncMotorPolicies(uid))
  yield put(unsyncAddressesAction(uid))
}

/**
 * Subscribe to data that is NOT dependent on the current user.
 */
function* syncNonUserDependantData() {
  yield put(syncInsurers())
  yield put(syncUser())
}

export default function* saga(): Iterable {
  yield takeLatest('SYNC_USER_DATA', syncUserData)
  yield takeLatest('SYNC_DATA', syncNonUserDependantData)
  yield takeLatest('UNSYNC_USER_DATA', unsyncUserData)
}
