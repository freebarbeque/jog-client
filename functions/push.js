/**
 * Notify the user that their policy will expire soon.
 * @param {string} policyId
 */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

const data = require('./data')
import {fetchInsurer} from './data'

function constructExpiryNotificationBody (policy, insurer, days) {
  let body
  if (days === 0) {
    body = `Your motor policy ${insurer ? `with ${insurer.name} ` : ''}will expire today`
  } else {
    body = `Your motor policy with ${insurer ? `with ${insurer.name} ` : ''}will expire in ` + days.toString() + " day" + (days === 1 ? '' : 's')
  }
  return body
}

function constructExpiredNotificationBody (policy, insurer, days) {
  let body
  if (days === 0) {
    body = `Your motor policy ${insurer ? `with ${insurer.name} ` : ''}expired`
  } else {
    body = `Your motor policy with ${insurer ? `with ${insurer.name} ` : ''}expired ` + days.toString() + " day" + (days === 1 ? '' : 's') + " ago."
  }
  return body
}

function sendNotification (policy, title, body) {
  const uid = policy.uid
  return data.fetchFCMToken(uid).then(function (token) {
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
      console.log(`User ${uid} does not have notifications enabled therefore not sending notification for ${policy.id}`)
      return Promise.resolve()
    }
  })
}

function notifyExpiry (policy) {
  const days = moment(policy.expiryDate).diff(moment(), 'days')

  return fetchInsurer(policy.companyId).then(function (insurer) {
    return sendNotification(
      policy,
      "Policy Expiry",
      constructExpiryNotificationBody(policy, insurer, days)
    ).then(() => {
      return data.markExpiryNotificationSent(policy.id, days)
    })
  })
}

function notifyExpired (policy) {
  const days = moment().diff(moment(policy.expiryDate), 'days')
  return fetchInsurer(policy.companyId).then(function (insurer) {
    return sendNotification(
      policy,
      "Policy Expired",
      constructExpiredNotificationBody(policy, insurer, days)
    ).then(() => {
      return data.markExpiredNotificationSent(policy.id, days)
    })
  })
}

module.exports = {
  notifyExpired,
  notifyExpiry,
  sendNotification,
  constructExpiredNotificationBody,
  constructExpiryNotificationBody
}
