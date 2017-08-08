// @flow

import * as firebase from 'firebase'
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

import * as _ from 'lodash'
import mime from 'react-native-mime-types'
import uuid from 'uuid/v4'

const createThrottle = require('async-throttle')

import { demandCurrentUser, signOut, userSubscribe } from '../../data/auth'
import { syncUserDetails, updateCurrentUserDetails } from '../../data/user'
import { declareError } from '../errors/actions'
import { finishLoading, startLoading } from '../loading/actions'
import { setLoading } from '../screens/auth/actions'

import {
  subscribePushNotifications,
  unsubscribePushNotifications,
} from '../../../native/store/push/actions'
import { ReduxState } from '../../types'
import { syncUserData, unsyncUserData } from '../actions'
import { getNavigationAdapter, getStore, getUploadAdapter } from '../index'
import {
  SyncUserAction,
  UpdateUserDetails,
  UpdateUserProfilePicture,
} from './actionTypes'

import { receiveUser, receiveUserDetails } from './actions'

const throttle = createThrottle(1)

// Creates an event channel that polls & throttles firebase.User.reload
function createUserPollChannel(ms: number = 1000) {
  return eventChannel(emit => {
    const interval = setInterval(
      () =>
        throttle(async () => {
          const user = firebase.auth().currentUser
          await user.reload()
          emit(user.toJSON())
        }),
      ms,
    )

    return () => {
      clearInterval(interval)
    }
  })
}

function createUserSubscribeChannel() {
  return eventChannel(emit => {
    let user = null
    let details = null
    let unsubscribeDetails = null

    const unsubscribeUser = userSubscribe(newUser => {
      const uid = user && user.uid
      const newUid = newUser && newUser.uid

      user = newUser

      if (uid !== newUid) {
        if (unsubscribeDetails) unsubscribeDetails()
        if (newUid) {
          unsubscribeDetails = syncUserDetails(newUid, newDetails => {
            details = newDetails
            emit({ user, details })
            const profilePhoto = details.profilePhoto
            if (profilePhoto) {
              const ref = firebase.storage().ref(profilePhoto)
              ref
                .getDownloadURL()
                .then(url => {
                  console.log('profilePhoto', profilePhoto, url)
                  details = {
                    ...details,
                    profilePhotoURL: url,
                  }
                  emit({ user, details })
                })
                .catch(err => {
                  console.warn('Error downloading profile photo', err)
                })
            }
          })
        }
      }

      emit({ user, details })
    })

    return () => {
      unsubscribeUser()
      if (unsubscribeDetails) unsubscribeDetails()
    }
  })
}

function* reloadUserTask() {
  const channel = yield call(createUserPollChannel)

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const user = yield take(channel)
      yield put(receiveUser(user))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* syncUserTask() {
  const channel = yield call(createUserSubscribeChannel)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { user, details } = yield take(channel)

      const state: ReduxState = getStore().getState()
      const previousDetails = state.auth.details

      yield put(receiveUser(user))
      yield put(receiveUserDetails(details))

      if (user) {
        // Ensure only one push notification subscription at a time.
        if (details && details.enableNotifications) {
          const wasUnsubscribed =
            !previousDetails || !previousDetails.enableNotifications
          if (wasUnsubscribed) {
            yield put(subscribePushNotifications())
          }
        } else if (details) {
          console.log(
            'Unsubscribing from push notifications as user disabled push notifications',
          )
          yield put(unsubscribePushNotifications())
        } else {
          console.log(
            'Unsubscribing from push notifications as there are no user details',
          )
          yield put(unsubscribePushNotifications())
        }
        yield put(syncUserData(user.uid))
      } else {
        console.log(
          'Unsubscribing from push notifications as no user logged in',
        )
        yield put(unsubscribePushNotifications())
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* logout() {
  const user = firebase.auth().currentUser
  if (user) {
    yield put(setLoading(true))
    yield call(signOut)
    yield put(unsyncUserData(user.uid))
    yield put(setLoading(false))
  } else {
    console.warn(
      'Attempted to logout when no user was logged in. This indicates that the user was able to access the Sign Out button without being logged in.',
    )
  }

  yield put(getNavigationAdapter().navigateToAuth())
}

function* updateUserDetailsTask(action: UpdateUserDetails) {
  const details = action.details
  const silent = action.silent
  if (!silent) yield put(startLoading('Updating details'))
  yield call(() => updateCurrentUserDetails(details))
  if (!silent) yield put(finishLoading())
}

function* updateUserProfilePictureTask(action: UpdateUserProfilePicture) {
  const fileUrl = action.fileUrl
  const file = action.file
  let contentType
  let extension
  if (fileUrl) {
    const fileName = _.last(fileUrl.split('/'))
    extension = _.last(fileName.split('.'))
    contentType = mime.lookup(fileName)
  } else if (file) {
    contentType = file.type
    const fileName = file.name
    extension = _.last(fileName.split('.'))
  } else {
    throw new Error('Must pass either fileUrl or file')
  }

  const id = uuid()
  const user = demandCurrentUser()
  const fileStoragePath = `/profilePhotos/${user.uid}/${id}.${extension}`

  try {
    yield call(() =>
      getUploadAdapter().uploadFile({
        fileStoragePath,
        filePath: fileUrl,
        file,
        contentType,
        contentEncoding: 'base64',
      }),
    )
    yield call(() =>
      updateCurrentUserDetails({ profilePhoto: fileStoragePath }),
    )
  } catch (e) {
    console.warn('Error uploading image', e, e.stack)
    yield put(declareError('Unable to upload document'))
    return
  }

  yield put(finishLoading())
}

/**
 * Unfortunately, firebase.auth().onAuthStateChanged only fires when the user changes but not when
 * user properties change.
 *
 * For the above reason we must call .reload on the user to refresh the properties.
 * This is used when waiting for email verification before hiding the auth modal.
 */
export function* pollUserSaga() {
  while (yield take('auth/POLL_REFRESH_USER')) {
    const bgTask = yield fork(reloadUserTask)
    yield take('auth/STOP_POLL_REFRESH_USER')
    yield cancel(bgTask)
  }
}

export function* authSaga() {
  yield takeLatest('auth/LOGOUT', logout)
  yield takeLatest('auth/UPDATE_USER_DETAILS', updateUserDetailsTask)
  yield takeLatest(
    'auth/UPDATE_USER_PROFILE_PICTURE',
    updateUserProfilePictureTask,
  )
}

export function* userSyncSaga() {
  let action: SyncUserAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('auth/SYNC_USER'))) {
    yield fork(syncUserTask, action)
  }
}
