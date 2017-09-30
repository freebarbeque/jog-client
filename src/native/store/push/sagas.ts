import * as _ from 'lodash'
import FCM, {
  FCMEvent,
  NotificationType,
  RemoteNotificationResult,
  WillPresentNotificationResult,
} from 'react-native-fcm'

import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeEvery,
} from 'redux-saga/effects'

const uuid = require('uuid/v4')

import { eventChannel } from 'redux-saga'

import { INavReduxState, IReduxState } from '~/common/types'
import { isAndroid } from '~/native/util/system'

import { updateUserDetails } from '../../../common/store/auth/actions'

import { getNavigationAdapter, getStore } from '../../../common/store/index'
import * as actions from './actions'
import {
  IReceivePushNotification,
  ISubscribePushNotificationsAction,
} from './actionTypes'

// FCM doesn't clear the initial notification once you've received it, and there is no way to clear it.
let processedInitialNotification = false

function createPushNotificationsChannel() {
  return eventChannel(emit => {
    let refreshTokenListener: any = null

    FCM.getFCMToken().then(token => emit({ token }))

    if (!processedInitialNotification) {
      FCM.getInitialNotification().then(notification => {
        if (!processedInitialNotification) {
          processedInitialNotification = true
          if (notification) {
            // Sadly this doesn't work at the moment.
            FCM.removeAllDeliveredNotifications()
            emit({ notification })
          }
        }
      })
    }

    const notificationListener = FCM.on(
      FCMEvent.Notification,
      async notification => {
        emit({ notification })

        if (!isAndroid()) {
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

        refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
          emit({ token })
        })
      },
    )

    return () => {
      if (refreshTokenListener) refreshTokenListener.remove()
      if (notificationListener) notificationListener.remove()
    }
  })
}

export function* subscribePushNotifications() {
  yield call(() => FCM.requestPermissions()) // For iOS

  const channel = yield call(createPushNotificationsChannel)
  yield put(actions.hidePushNotificationsModal())

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { token, notification } = yield take(channel)
      if (token) {
        yield put(updateUserDetails({ fcmToken: token }, true))
      } else if (notification) {
        yield put(actions.receivePushNotification(notification))
      }
    }
  } finally {
    if (yield cancelled()) {
      if (channel) {
        channel.close()
      }
    }
  }
}

function* enablePushNotificationsTask() {
  yield put(updateUserDetails({ enableNotifications: true }, true))
  yield put(actions.subscribePushNotifications())
}

function* disablePushNotificationsTask() {
  yield put(updateUserDetails({ enableNotifications: false }, true))
  yield put(actions.unsubscribePushNotifications())
}

function getPolicyIndex(policyId) {
  const state: IReduxState = getStore().getState()
  const policies = state.policies.policies
  const policyIndex =
    _.findIndex(_.values(policies), p => p.id === policyId) + 1
  return policyIndex
}

function _policyDetailsScreenShowing(policyId, route) {
  const isPolicyDetails =
    route.routeName === 'PolicyDetails' &&
    _.get(route, ['params', 'policyId']) === policyId
  if (isPolicyDetails) {
    return true
  } else if (route.index !== undefined && route.routes) {
    return _policyDetailsScreenShowing(policyId, route.routes[route.index])
  }

  return false
}

function policyDetailsScreenShowing(policyId) {
  const navState: INavReduxState = getStore().getState().nav
  const index = navState.index
  const route = navState.routes[index]
  return _policyDetailsScreenShowing(policyId, route)
}

function navigateToPolicyDetails(policyId) {
  return getNavigationAdapter().navigateToPolicyDetails(
    policyId,
    getPolicyIndex(policyId),
    false,
  )
}

function* receivePushNotificationTask(action: IReceivePushNotification) {
  const notification = action.notification
  const wasTapped = notification._notificationType === 'notification_response'
  const policyId = notification.policy
  if (wasTapped || notification.opened_from_tray) {
    if (policyId && !policyDetailsScreenShowing(policyId)) {
      yield put(navigateToPolicyDetails(policyId))
    }
  } else if (isAndroid() && !notification.local_notification) {
    // This ensures that the notification is presented even if the app is open on android.
    // This is the default behaviour on iOS
    if (!notification.opened_from_tray) {
      const { body, title } = notification.fcm

      FCM.presentLocalNotification(
        {
          id: uuid(),
          title,
          body,
          sound: 'default',
          priority: 'high',
          click_action: 'fcm.action.OPEN_POLICY_DETAILS',
          show_in_foreground: true,
          policy: notification.policy,
        } as any,
      )
    }
  } else if (notification.local_notification && notification.opened_from_tray) {
    if (policyId && !policyDetailsScreenShowing(policyId)) {
      yield put(navigateToPolicyDetails(policyId))
    }
  }
}

export function* pushNotificationSaga() {
  yield takeEvery('push/ENABLE_PUSH_NOTIFICATIONS', enablePushNotificationsTask)
  yield takeEvery(
    'push/DISABLE_PUSH_NOTIFICATIONS',
    disablePushNotificationsTask,
  )
  yield takeEvery('push/RECEIVE_PUSH_NOTIFICATION', receivePushNotificationTask)
}

export function* pushNotificationSubscriptionSaga() {
  let action: ISubscribePushNotificationsAction | undefined

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('push/SUBSCRIBE_PUSH_NOTIFICATIONS'))) {
    const bgTask = yield fork(subscribePushNotifications, action)
    yield take('push/UNSUBSCRIBE_PUSH_NOTIFICATIONS')
    yield cancel(bgTask)
  }
}
