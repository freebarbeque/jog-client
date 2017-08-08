// @flow

export interface SubscribePushNotificationsAction {
  type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS'
}

export interface UnsubscribePushNotificationsAction {
  type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS'
}

export interface EnablePushNotifications {
  type: 'push/ENABLE_PUSH_NOTIFICATIONS'
}

export interface DisablePushNotifications {
  type: 'push/DISABLE_PUSH_NOTIFICATIONS'
}

export interface ShowPushNotificationsModal {
  type: 'push/SHOW_PUSH_NOTIFICATIONS_MODAL'
}

export interface HidePushNotificationsModal {
  type: 'push/HIDE_PUSH_NOTIFICATIONS_MODAL'
}

export interface ReceivePushNotification {
  type: 'push/RECEIVE_PUSH_NOTIFICATION'
  notification: Object
}

export type PushAction =
  | SubscribePushNotificationsAction
  | UnsubscribePushNotificationsAction
  | EnablePushNotifications
  | DisablePushNotifications
  | ShowPushNotificationsModal
  | HidePushNotificationsModal
  | ReceivePushNotification
