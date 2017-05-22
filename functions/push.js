/**
 * Notify the user that their policy will expire soon.
 * @param {string} policyId
 */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

const data = require('./data')

function constructExpiryNotificationBody(policy, days) {
  let body
  if (days === 0) {
    body = "Your motor policy will expire today"
  } else {
    body = "Your motor policy will expire in " + days.toString() + " day" + (days === 1 ? '' : 's')
  }
  return body
}

function constructExpiredNotificationBody(policy, days) {
  let body
  if (days === 0) {
    body = "Your motor policy expire"
  } else {
    body = "Your motor policy expired " + days.toString() + " day" + (days === 1 ? '' : 's') + " ago."
  }
  return body
}

function sendNotification(policy, title, body) {
  return data.fetchFCMToken(policy.uid).then(function (token) {
    if (token) {
      const messaging = admin.messaging()
      const opts = {
        notification: {
          title,
          body
        },
        data: {
          policy: policy.id
        }
      }
      console.log(`Sending notification to user ${policy.uid} using token ${token}`, opts)
      return messaging.sendToDevice(token, opts)
    } else {
      throw new Error('User with id ' + policy.uid + ' does not have an FCM token')
    }
  })
}

function notifyExpiry (policy) {
  const days = moment(policy.expiryDate).diff(moment(), 'days')

  return sendNotification(
    policy,
    "Policy Expiry",
    constructExpiryNotificationBody(policy, days)
  ).then(() => {
    return data.markExpiryNotificationSent(policy.id, days)
  })
}

function notifyExpired (policy) {
  const days = moment().diff(moment(policy.expiryDate), 'days')

  return sendNotification(
    policy,
    "Policy Expired",
    constructExpiredNotificationBody(policy, days)
  ).then(() => {
    return data.markExpiredNotificationSent(policy.id, days)
  })
}

module.exports = {
  notifyExpired,
  notifyExpiry,
  sendNotification,
  constructExpiredNotificationBody,
  constructExpiryNotificationBody
}
