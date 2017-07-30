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
import * as firebase from 'firebase'
import uuid from 'uuid/v4'
import mime from 'react-native-mime-types'
import * as _ from 'lodash'

import {
  syncMotorPolicies,
  addPolicyDocument,
  removePolicyDocument,
  getPolicyDocument,
} from '../../data/policies'
import { demandCurrentUser } from '../../data/auth'

import { receiveMotorPolicies } from './actions'
import {
  DeletePolicyDocumentAction,
  SyncMotorPoliciesAction,
  UploadPolicyDocumentAction,
  UploadPolicyDocumentsAction,
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

export function* syncPoliciesSaga() {
  let action: SyncMotorPoliciesAction

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

function* uploadPolicyDocumentsTask(action: UploadPolicyDocumentsAction) {
  const files = action.files
  const policyId = action.policyId

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const fileName = file.name
    const contentType = file.type

    const extension: string = _.last(fileName.split('.'))
    yield put(startLoading(`Uploading ${fileName}`))
    const user = demandCurrentUser()
    const id = uuid()
    const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${id}.${extension}`

    try {
      yield call(() =>
        getUploadAdapter().uploadFile({
          file,
          fileStoragePath,
          contentType,
          contentEncoding: 'base64',
        }),
      )
    } catch (e) {
      console.warn('Error uploading image', e)
      yield put(declareError(`Unable to upload ${fileName}`))
      return
    }

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
      console.error('Error uploading file metadata', e)
      yield put(declareError('Unable to upload file metadata'))
      return
    }
  }

  yield put(finishLoading())
}

function* uploadPolicyDocumentTask(action: UploadPolicyDocumentAction) {
  const { fileUrl, policyId, file } = action
  let { fileName, extension } = action

  if (file) {
    fileName = file.name
    extension = _.last(fileName.split('.'))
  }

  yield put(startLoading(`Uploading ${fileName || ''}`))

  const user = demandCurrentUser()

  const id = uuid()
  const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${id}.${extension ||
    ''}`

  try {
    // For whatever reason, the firebase module claims the base64 data from RNFetchBlob is invalid so we decode it manually.
    const contentType = file ? file.type : mime.lookup(fileName)

    console.error(
      file
        ? `Uploading ${file.name} to ${fileStoragePath}`
        : `Uploading document at ${fileUrl ||
            ''} to ${fileStoragePath} with content-type ${contentType}`,
    )

    yield call(() =>
      getUploadAdapter().uploadFile({
        filePath: fileUrl,
        file,
        fileStoragePath,
        contentType,
        contentEncoding: 'base64',
      }),
    )
  } catch (e) {
    console.warn('Error uploading image', e)
    yield put(declareError(`Unable to upload ${fileName || ''}`))
    return
  }

  console.log(`Stored at ${fileStoragePath}`)

  try {
    // Firebase storage does not have an API for listing files in folders and therefore we
    // must store file data within the database.
    if (fileName && extension) {
      yield call(() =>
        addPolicyDocument(policyId, {
          image: fileStoragePath,
          name: fileName || '',
          extension: extension || '',
          id,
        }),
      )
    } else {
      throw new TypeError(
        'fileName && extension must be truthy in order to add policy document',
      )
    }
  } catch (e) {
    console.log('Error uploading file metadata', e)
    yield put(declareError('Unable to upload file metadata'))
    return
  }

  yield put(finishLoading())
}

function* deletePolicyDocumentTask({
  policyId,
  documentId,
}: DeletePolicyDocumentAction) {
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
    console.log('Error deleting file metadata', e)
    yield put(declareError('Unable to delete file metadata'))
    return
  }
  yield put(finishLoading())
}

export function* policyOperationsSaga() {
  yield takeLatest('policies/UPLOAD_POLICY_DOCUMENT', uploadPolicyDocumentTask)
  yield takeLatest(
    'policies/UPLOAD_POLICY_DOCUMENTS',
    uploadPolicyDocumentsTask,
  )
  yield takeLatest('policies/DELETE_POLICY_DOCUMENT', deletePolicyDocumentTask)
}
