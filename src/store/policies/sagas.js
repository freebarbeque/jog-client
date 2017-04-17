// @flow

import {
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
  takeLatest
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

import { syncMotorPolicies } from 'jog/src/data/policies'
import { demandCurrentUser } from 'jog/src/data/auth'

import { receiveMotorPolicies } from './actions'
import type { SyncMotorPoliciesAction } from './actionTypes'

//
// Sync policies
//

function policyEventChannel(uid: string) {
  return eventChannel((emitter) =>
    syncMotorPolicies(
      uid,
      (policies) => {
        emitter(policies)
      }
    )
  )
}

function* syncMotorPoliciesTask({ uid }) {
  const channel = yield call(
    policyEventChannel,
    uid
  )
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const policies = yield take(channel)
      yield put(receiveMotorPolicies(policies))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncPoliciesSaga<T>() : Iterable<T> {
  let action: ?SyncMotorPoliciesAction

  // eslint-disable-next-line no-cond-assign
  while (action = yield take('policies/SYNC_MOTOR_POLICIES')) {
    // Start the sync in the background
    const bgTask = yield fork(syncMotorPoliciesTask, action)

    // Wait for the sync to cancel
    yield take('policies/UNSYNC_MOTOR_POLICIES')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}

//
// Policy operations
//

function* uploadPolicyDocument({ fileUrl, policyId }) {
  const split = fileUrl.split('file:///')
  const path = split[1]
  const fileName = path.split('/').pop()
  const user = demandCurrentUser()

  const data = yield call(RNFetchBlob.fs.readFile, path, 'base64')
  const storagePath = `/policyDocuments/${user.uid}/${policyId}/${fileName}`
  console.debug(`Storing file at "${storagePath}"`)
  const ref = firebase.storage().ref(storagePath)
  yield call(ref.putString.bind(ref), data, 'base64')
}

export function* policyOperationsSaga<T>(): Iterable<T> {
  yield takeLatest('policies/UPLOAD_POLICY_DOCUMENT', uploadPolicyDocument)
}

