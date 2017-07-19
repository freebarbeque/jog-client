// @flow

import firebase from 'firebase'
import { Address } from '../../business/types'

export function setAddress(uid: string, address: Address) {
  const db = firebase.database()
  return db.ref(`/addresses/${uid}/${address.id}`).set(address)
}

export async function getAddresses(uid: string): { [string]: Address } {
  const db = firebase.database()
  const ref = db.ref(`/addresses/${uid}`)
  const snapshot = await ref.once('value')
  return snapshot.val() || {}
}

export function syncAddresses(
  uid: string,
  cb: (addresses: { [string]: Address }) => void,
): () => void {
  const db = firebase.database()
  const ref = db.ref(`/addresses/${uid}`)
  const listener = snapshot => {
    const addresses = snapshot.val() || {}
    cb(addresses)
  }
  ref.on('value', listener)
  return () => ref.off('value', listener)
}
