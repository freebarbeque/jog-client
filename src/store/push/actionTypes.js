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

export type ShowPushNotificationsModal = {
  type: 'push/SHOW_PUSH_NOTIFICATIONS_MODAL',
}

export type HidePushNotificationsModal = {
  type: 'push/HIDE_PUSH_NOTIFICATIONS_MODAL',
}

export type PushAction =
  | SubscribePushNotificationsAction
  | UnsubscribePushNotificationsAction
  | EnablePushNotifications
  | DisablePushNotifications
| ShowPushNotificationsModal
| HidePushNotificationsModal
