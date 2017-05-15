// @flow

import firebase from 'firebase'
import Firestack from 'react-native-firestack'
import config from 'jog/src/config/index'

let initialised = false

let firestack = null

export default function initialiseFirebase() {
  if (!initialised) {
    const firebaseOptions = config.firebase
    firebase.initializeApp(firebaseOptions)
    initialised = true
    firestack = new Firestack()
  }
}

export function getFirestack() {
  if (!firestack) throw new Error('Firestack not initialised.')
  return firestack
}
