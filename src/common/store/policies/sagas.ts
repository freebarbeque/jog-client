import * as firebase from 'firebase'
import * as _ from 'lodash'
import mime from 'react-native-mime-types'
import { eventChannel } from 'redux-saga'

import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects'
import uuid from 'uuid/v4'

import { demandCurrentUser } from '../../data/auth'
import {
  addPolicyDocument,
  getPolicyDocument,
  removePolicyDocument,
  syncMotorPolicies,
} from '../../data/policies'

import Logger, { Levels } from '~/common/Logger'
import { declareError } from '../errors/actions'
import { getUploadAdapter } from '../index'
import { finishLoading, startLoading } from '../loading/actions'
import { receiveMotorPolicies } from './actions'
import {
  IDeletePolicyDocumentAction,
  ISyncMotorPoliciesAction,
  IUploadPolicyDocumentAction,
  IUploadPolicyDocumentsAction,
} from './actionTypes'

const log = new Logger('common/store/policies/sagas', Levels.TRACE)

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
      log.trace('received new policies', policies)
      yield put(receiveMotorPolicies(policies))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncPoliciesSaga() {
  let action: ISyncMotorPoliciesAction

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

function* uploadPolicyDocumentsTask(action: IUploadPolicyDocumentsAction) {
  const files = action.files
  const policyId = action.policyId

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const fileName = file.name
    const contentType = file.type

    const extension: string | undefined = _.last(fileName.split('.'))
    if (!extension) throw new Error('Unable to get file extension')
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
      log.warn('Error uploading image', e)
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
          extension,
          id,
        }),
      )
    } catch (e) {
      log.error('Error uploading file metadata', e)
      yield put(declareError('Unable to upload file metadata'))
      return
    }
  }

  yield put(finishLoading())
}

function* uploadPolicyDocumentTask(action: IUploadPolicyDocumentAction) {
  const { fileUrl, policyId, file } = action
  let { fileName, extension } = action

  if (file) {
    fileName = file.name
    extension = fileName ? _.last(fileName.split('.')) : ''
  }

  yield put(startLoading(`Uploading ${fileName || ''}`))

  const user = demandCurrentUser()

  const id = uuid()
  const fileStoragePath = `/policyDocuments/${user.uid}/${policyId}/${id}.${extension ||
    ''}`

  try {
    // For whatever reason, the firebase module claims the base64 data from RNFetchBlob is invalid so we decode it manually.
    const contentType = file ? file.type : mime.lookup(fileName)

    log.error(
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
    log.warn('Error uploading image', e)
    yield put(declareError(`Unable to upload ${fileName || ''}`))
    return
  }

  log.trace(`Stored at ${fileStoragePath}`)

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
    log.warn('Error uploading file metadata', e)
    yield put(declareError('Unable to upload file metadata'))
    return
  }

  yield put(finishLoading())
}

function* deletePolicyDocumentTask({
  policyId,
  documentId,
}: IDeletePolicyDocumentAction) {
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
    log.warn('Error deleting file metadata', e)
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
