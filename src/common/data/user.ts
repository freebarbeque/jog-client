// @flow

import * as firebase from 'firebase'
import { IUserDetails } from '../types'
import { demandCurrentUser } from './auth'

export async function getUserDetails(uid: string): Promise<IUserDetails> {
  const snapshot = await firebase
    .database()
    .ref('users')
    .child(uid)
    .once('value')
  return snapshot.val() || {}
}

export function syncUserDetails(
  uid: string,
  cb: (details: IUserDetails) => void,
) {
  const listener = snapshot => {
    const details = snapshot.val() || {}
    cb(details)
  }
  const ref = firebase.database().ref('users').child(uid)
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export async function updateUserDetails(
  uid: string,
  details: IUserDetails,
): Promise<void> {
  const ref = firebase.database().ref('users').child(uid)
  await ref.update(details)
}

export function getCurrentUserDetails(): Promise<IUserDetails> {
  const user = demandCurrentUser()
  const uid = user.uid
  return getUserDetails(uid)
}

export function syncCurrentUserDetails(cb: (details: IUserDetails) => void) {
  const user = demandCurrentUser()
  const uid = user.uid
  syncUserDetails(uid, cb)
}

export async function updateCurrentUserDetails(
  details: IUserDetails,
): Promise<void> {
  const user = demandCurrentUser()
  const uid = user.uid
  return updateUserDetails(uid, details)
}
