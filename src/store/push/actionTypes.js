// @flow

export type SubscribePushNotificationsAction = {
  type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS'
}

export type UnsubscribePushNotificationsAction = {
  type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS'
}

export type PushAction = SubscribePushNotificationsAction | UnsubscribePushNotificationsAction
