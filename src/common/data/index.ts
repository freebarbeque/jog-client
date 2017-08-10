import * as firebase from 'firebase'
import { IEnvironmentConfig } from '../types'

let initialised = false

export default function initialiseFirebase(config: IEnvironmentConfig) {
  if (!initialised) {
    console.log(firebase)
    const firebaseOptions = config.firebase
    if (!firebaseOptions)
      throw new Error(
        'Cannot initialise firebase as config.firebase is not defined.',
      )
    firebase.initializeApp(firebaseOptions)
    initialised = true
  }
}
