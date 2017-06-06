// @flow

import firebase from 'firebase'
import Firestack from 'react-native-firestack'
import config from 'jog/src/native/config/index'

let initialised = false

let firestack = null

export default function initialiseFirebase() {
  if (!initialised) {
    const firebaseOptions = config.firebase
    console.log('config', config)
    if (!firebaseOptions)
      throw new Error(
        'Cannot initialise firebase as config.firebase is not defined.',
      )
    console.log('firebaseOptions', firebaseOptions)
    firebase.initializeApp(firebaseOptions)
    initialised = true
    firestack = new Firestack()
  }
}

export function getFirestack() {
  if (!firestack) throw new Error('Firestack not initialised.')
  return firestack
}
