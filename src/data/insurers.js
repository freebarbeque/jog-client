// @flow

import firebase from 'firebase'
import type { InsurerMap } from '../types'

export function syncInsurers(cb: (insurers: InsurerMap) => void) : () => void {
  const ref = firebase.database().ref('insurers')
  const listener = (snapshot) => {
    const val = snapshot.val()
    if (val) {
      cb(val)
    } else {
      cb({})
    }
  }
  ref.on('value', listener)
  return () => ref.off('value', listener)
}
