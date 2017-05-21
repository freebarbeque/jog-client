const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * Notify the user that their policy will expire soon.
 * @param {string} uid
 * @param {MotorPolicy} policy
 */
function notifyExpiry(uid, policy) {
  const payload = {
    notification: {
      title: "Policy expiration",
      body: `Your motor policy will expire soon.`
    },
    data: {
      policy: policy.id,
    }
  };

  admin.database().ref(`users/${uid}`).once('value', function (snapshot) {
    const user = snapshot.val()
    if (user) {
      const token = user.fcmToken
      admin.messaging().sendToDevice(token, payload).catch(function (err) {
        console.log('[ERROR] Unable to send notification', err)
      })
    } else {
      console.log('[ERROR] No such user', uid)
    }
  })
}


exports.hourly_job = functions.pubsub.topic('hourly-tick').onPublish((event) => {
    console.log("This job is run every hour!")
  });
