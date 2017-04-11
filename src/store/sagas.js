import { put, takeLatest } from 'redux-saga/effects'
import { syncMotorPolicies, unsyncMotorPolicies } from './policies/actions'

function* syncUserData({ uid }) {
  yield put(syncMotorPolicies(uid))
}

function* unsyncUserData({ uid }) {
  yield put(unsyncMotorPolicies(uid))
}

export default function* saga() : Iterable {
  yield takeLatest('SYNC_USER_DATA', syncUserData)
  yield takeLatest('UNSYNC_USER_DATA', unsyncUserData)
}
