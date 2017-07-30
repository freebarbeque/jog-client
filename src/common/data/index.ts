import * as firebase from 'firebase'
import { EnvironmentConfig } from '../types'

let initialised = false

export default function initialiseFirebase(config: EnvironmentConfig) {
  if (!initialised) {
    const firebaseOptions = config.firebase
    if (!firebaseOptions)
      throw new Error(
        'Cannot initialise firebase as config.firebase is not defined.',
      )
    firebase.initializeApp(firebaseOptions)
    initialised = true
  }
}
