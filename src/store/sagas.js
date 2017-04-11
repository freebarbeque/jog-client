import { put, takeLatest } from 'redux-saga/effects'
import { syncMotorPolicies, unsyncMotorPolicies } from './policies/actions'
import { syncInsurers } from './insurers/actions'

function* syncUserData({ uid }) {
  yield put(syncMotorPolicies(uid))
}

function* unsyncUserData({ uid }) {
  yield put(unsyncMotorPolicies(uid))
}

function* syncData() {
  yield put(syncInsurers())
}

export default function* saga() : Iterable {
  yield takeLatest('SYNC_USER_DATA', syncUserData)
  yield takeLatest('SYNC_DATA', syncData)
  yield takeLatest('UNSYNC_USER_DATA', unsyncUserData)
}
