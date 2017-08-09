// @flow

export interface ISubscribePushNotificationsAction {
  type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS'
}

export interface IUnsubscribePushNotificationsAction {
  type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS'
}

export interface IEnablePushNotifications {
  type: 'push/ENABLE_PUSH_NOTIFICATIONS'
}

export interface IDisablePushNotifications {
  type: 'push/DISABLE_PUSH_NOTIFICATIONS'
}

export interface IShowPushNotificationsModal {
  type: 'push/SHOW_PUSH_NOTIFICATIONS_MODAL'
}

export interface IHidePushNotificationsModal {
  type: 'push/HIDE_PUSH_NOTIFICATIONS_MODAL'
}

export interface IReceivePushNotification {
  type: 'push/RECEIVE_PUSH_NOTIFICATION'
  notification: any
}

export type PushAction =
  | ISubscribePushNotificationsAction
  | IUnsubscribePushNotificationsAction
  | IEnablePushNotifications
  | IDisablePushNotifications
  | IShowPushNotificationsModal
  | IHidePushNotificationsModal
  | IReceivePushNotification
