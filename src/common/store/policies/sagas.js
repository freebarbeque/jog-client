// @flow

import {
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
  takeLatest,
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import firebase from 'firebase'
import uuid from 'uuid/v4'
import mime from 'react-native-mime-types'

import {
  syncMotorPolicies,
  addPolicyDocument,
  removePolicyDocument,
  getPolicyDocument,
} from '../../data/policies'
import { demandCurrentUser } from '../../data/auth'
import { updateCurrentUserDetails } from '../../data/user'

import { receiveMotorPolicies } from './actions'
import type {
  SyncMotorPoliciesAction,
  UploadPolicyDocumentAction,
} from './actionTypes'
import { finishLoading, startLoading } from '../loading/actions'
import { declareError } from '../errors/actions'
import { getUploadAdapter } from '../index'

//
// Sync policies
//

function policyEventChannel(uid: string) {
  return eventChannel(emitter =>
    syncMotorPolicies(uid, policies => {
      emitter(policies)
    }),
  )
}

function* syncMotorPoliciesTask({ uid }) {
  const channel = yield call(policyEventChannel, uid)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const policies = yield take(channel)
      console.log('syncMotorPoliciesTask received new policies', policies)
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
  while ((action = yield take('policies/SYNC_MOTOR_POLICIES'))) {
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

function* uploadPolicyDocumentTask(action: UploadPolicyDocumentAction) {
  const { fileUrl, policyId, extension, fileName } = action

  yield put(startLoading('Loading document'))
  const user = demandCurrentUser()

  const id = uuid()
  const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${id}.${extension}`

  yield put(startLoading('Uploading document'))

  try {
    // For whatever reason, the firebase module claims the base64 data from RNFetchBlob is invalid so we decode it manually.
    const contentType = mime.lookup(fileName)

    console.debug(
      `Uploading document at ${fileUrl} to ${fileStoragePath} with content-type ${contentType}`,
    )

    yield call(() =>
      getUploadAdapter().uploadFile({
        filePath: fileUrl,
        fileStoragePath,
        contentType,
        contentEncoding: 'base64',
      }),
    )

    yield call(() =>
      updateCurrentUserDetails({ profilePhoto: fileStoragePath }),
    )
  } catch (e) {
    console.warn('Error uploading image', e)
    yield put(declareError('Unable to upload document'))
    return
  }

  console.debug(`Stored at ${fileStoragePath}`)

  yield put(startLoading('Uploading metadata'))

  try {
    // Firebase storage does not have an API for listing files in folders and therefore we
    // must store file data within the database.
    yield call(() =>
      addPolicyDocument(policyId, {
        image: fileStoragePath,
        name: fileName,
        extension: extension,
        id,
      }),
    )
  } catch (e) {
    console.debug('Error uploading file metadata', e)
    yield put(declareError('Unable to upload file metadata'))
    return
  }

  yield put(finishLoading())
}

function* deletePolicyDocumentTask({ policyId, documentId }) {
  const user = demandCurrentUser()
  yield put(startLoading('Deleting document'))
  const document = yield call(() => getPolicyDocument(policyId, documentId))
  const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${documentId}.${document.extension}`
  try {
    yield call(() => firebase.storage().ref(fileStoragePath).delete())
  } catch (e) {
    yield put(declareError('Unable to delete file'))
    return
  }
  try {
    yield call(() => removePolicyDocument(policyId, documentId))
  } catch (e) {
    console.debug('Error deleting file metadata', e)
    yield put(declareError('Unable to delete file metadata'))
    return
  }
  yield put(finishLoading())
}

export function* policyOperationsSaga<T>(): Iterable<T> {
  yield takeLatest('policies/UPLOAD_POLICY_DOCUMENT', uploadPolicyDocumentTask)
  yield takeLatest('policies/DELETE_POLICY_DOCUMENT', deletePolicyDocumentTask)
}
