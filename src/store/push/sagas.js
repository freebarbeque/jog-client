// @flow


import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import { Platform } from 'react-native'

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

import { updateUserDetails } from '../auth/actions'

import { SubscribePushTokenAction } from './actionTypes'

function createPushNotificationsChannel() {
  return eventChannel((emit) => {
    let refreshTokenListener = null

    FCM.getFCMToken().then((token) => emit({ token }))

    const notificationListener = FCM.on(FCMEvent.Notification, async (notification) => {
      emit({ notification })

      if (Platform.OS === 'ios') {
        // eslint-disable-next-line
        switch (notification._notificationType) {
          case NotificationType.Remote:
            notification.finish(RemoteNotificationResult.NewData) // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break
          case NotificationType.NotificationResponse:
            notification.finish()
            break
          case NotificationType.WillPresent:
            notification.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
            break
          default:
            break
        }
      }

      refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        emit({ token })
      })
    })

    return () => {
      if (refreshTokenListener) this.refreshTokenListener.remove()
      if (notificationListener) notificationListener.remove()
    }
  })
}

export function* subscribePushNotifications<T>(): Iterable<T> {
  yield call(() => FCM.requestPermissions()) // For iOS

  const channel = yield call(createPushNotificationsChannel)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { token, notification } = yield take(channel)
      if (token) {
        console.log('Received push token', token)
        yield put(updateUserDetails({ fcmToken: token }, true))
      } else if (notification) {
        console.log('Received notification', notification)
        // TODO: Do something with the notification?
        if (notification.local_notification) {
          // this is a local notification
        }

        if (notification.opened_from_tray) {
          // app is open/resumed because user clicked banner
        }
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* pushNotificationSaga<T>(): Iterable<T> {
  let action: ?SubscribePushTokenAction

  // eslint-disable-next-line no-cond-assign
  while (action = yield take('push/SUBSCRIBE_PUSH_NOTIFICATIONS')) {
    const bgTask = yield fork(subscribePushNotifications, action)
    yield take('push/UNSUBSCRIBE_PUSH_NOTIFICATIONS')
    yield cancel(bgTask)
  }
}
