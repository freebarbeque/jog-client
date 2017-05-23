// @flow

export type SubscribePushNotificationsAction = {
  type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS',
}

export type UnsubscribePushNotificationsAction = {
  type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS',
}

export type EnablePushNotifications = {
  type: 'push/ENABLE_PUSH_NOTIFICATIONS',
}

export type DisablePushNotifications = {
  type: 'push/DISABLE_PUSH_NOTIFICATIONS',
}

export type PushAction =
  | SubscribePushNotificationsAction
  | UnsubscribePushNotificationsAction
  | EnablePushNotifications
  | DisablePushNotifications
