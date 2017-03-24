// @flow

import firebase from 'firebase'
import config from 'jog/src/config/index'

let initialised = false

export default function initialiseFirebase() {
  if (!initialised) {
    firebase.initializeApp(config.firebase)
    initialised = true
  }
}
