// @flow

import firebase from 'firebase'
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
import createThrottle from 'async-throttle'
import { NavigationActions } from 'react-navigation'
import mime from 'react-native-mime-types'
import uuid from 'uuid/v4'

import { signOut, userSubscribe, demandCurrentUser } from 'jog/src/data/auth'
import { syncUserDetails, updateCurrentUserDetails } from 'jog/src/data/user'
import { finishLoading, startLoading } from 'jog/src/store/loading/actions'
import { getFirestack } from 'jog/src/data'
import { declareError } from 'jog/src/store/errors/actions'
import { setLoading } from 'jog/src/store/screens/auth/actions'

import { receiveUser, receiveUserDetails } from './actions'
import type {
  SyncUserAction,
  UpdateUserDetails,
  UpdateUserProfilePicture,
} from './actionTypes'
import { syncUserData, unsyncUserData } from '../actions'
import {
  subscribePushNotifications,
  unsubscribePushNotifications,
} from '../push/actions'

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

      if (uid !== newUid) {
        if (unsubscribeDetails) unsubscribeDetails()
        if (newUid) {
          unsubscribeDetails = syncUserDetails(newUid, newDetails => {
            details = newDetails
            emit({ user, details })
            const profilePhoto = details.profilePhoto
            console.log('profilePhoto', profilePhoto)
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

      user = newUser
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
      yield put(receiveUser(user))
      yield put(receiveUserDetails(details))

      if (user) {
        // Ensure only one push notification subscription at a time.
        yield put(unsubscribePushNotifications())
        if (details && details.enableNotifications)
          yield put(subscribePushNotifications())
        yield put(syncUserData(user.uid))
      } else {
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
  yield put(NavigationActions.navigate({ routeName: 'Auth' }))
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
  const fileName = _.last(fileUrl.split('/'))
  const extension = _.last(fileName.split('.'))
  const contentType = mime.lookup(fileName)
  const id = uuid()
  const user = demandCurrentUser()
  const fileStoragePath = `/profilePhotos/${user.uid}/${id}.${extension}`

  try {
    yield call(() =>
      getFirestack().storage.uploadFile(fileStoragePath, fileUrl, {
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
export function* pollUserSaga<T>(): Iterable<T> {
  while (yield take('auth/POLL_REFRESH_USER')) {
    const bgTask = yield fork(reloadUserTask)
    yield take('auth/STOP_POLL_REFRESH_USER')
    yield cancel(bgTask)
  }
}

export function* authSaga<T>(): Iterable<T> {
  yield takeLatest('auth/LOGOUT', logout)
  yield takeLatest('auth/UPDATE_USER_DETAILS', updateUserDetailsTask)
  yield takeLatest(
    'auth/UPDATE_USER_PROFILE_PICTURE',
    updateUserProfilePictureTask,
  )
}

export function* userSyncSaga<T>(): Iterable<T> {
  let action: ?SyncUserAction

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('auth/SYNC_USER'))) {
    yield fork(syncUserTask, action)
  }
}
