const functions = require('firebase-functions')

const data = require('./data')
const push = require('./push')

exports.hourly_job = functions.pubsub.topic('hourly-tick').onPublish(
  function () {
    return Promise.all(
      [
        data.fetchExpiredPolicies().then(function (policies) {
          const filteredPolicies = data.filterExpiredPolicies(policies)
          console.log(`Processing expired notifications for ${filteredPolicies.length} policies`)
          return Promise.all(
            filteredPolicies.map(function (policy) {
              console.log('notifyExpired', policy)
              return push.notifyExpired(policy)
            })
          )
        }),
        data.fetchExpiringPolicies().then(function (policies) {
          const filteredPolicies = data.filterExpiringPolicies(policies)
          console.log(`Processing expiry notifications for ${filteredPolicies.length} policies`)
          return Promise.all(
            filteredPolicies.map(function (policy) {
              return push.notifyExpiry(policy)
            })
          )
        })
      ]
    )
  }
);
