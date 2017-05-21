// @flow

import type { SubscribePushNotificationsAction } from './actionTypes'

export function subscribePushNotifications() : SubscribePushNotificationsAction {
  return {
    type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS'
  }
}


export function unsubscribePushNotifications() : SubscribePushNotificationsAction {
  return {
    type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS'
  }
}
