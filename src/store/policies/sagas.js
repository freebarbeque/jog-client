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
import uuid from 'uuid/v4'
import base64 from 'base-64'

import { syncMotorPolicies, addPolicyDocument } from 'jog/src/data/policies'
import { demandCurrentUser } from 'jog/src/data/auth'
import { getFileMetadataFromURI } from 'jog/src/util/files'

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

export function* syncPoliciesSaga<T>(): Iterable<T> {
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

function* uploadPolicyDocumentTask({ fileUrl, policyId }) {
  const imageMetaData = getFileMetadataFromURI(fileUrl)

  console.log('imageMetaData', imageMetaData)

  const user = demandCurrentUser()

  // Using base64 encoding is nice on the JS bridge. If using ascii or utf-8 it can be really slow.
  const imageData = yield call(RNFetchBlob.fs.readFile, imageMetaData.path, 'base64')

  const id = uuid()
  const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${id}.${imageMetaData.extension}`

  const imageRef = firebase.storage().ref(fileStoragePath)
  try {
    // For whatever reason, the firebase module claims the base64 data from RNFetchBlob is invalid so we decode it manually.
    yield call(imageRef.putString.bind(imageRef), base64.decode(imageData), 'raw')
  } catch (e) { // TODO: Dispatch error for display to user
    console.error('Error uploading image', e)
    return
  }

  console.debug(`Stored at ${fileStoragePath}`)

  // Firebase storage does not have an API for listing files in folders and therefore we
  // must store file data within the database.
  yield call(addPolicyDocument, policyId, {
    image: fileStoragePath,
    name: imageMetaData.fileName,
    extension: imageMetaData.extension,
    id
  })
}

export function* policyOperationsSaga<T>(): Iterable<T> {
  yield takeLatest('policies/UPLOAD_POLICY_DOCUMENT', uploadPolicyDocumentTask)
}

