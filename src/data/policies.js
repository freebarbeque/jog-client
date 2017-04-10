// @flow

import firebase from 'firebase'
import type { MotorPolicy } from 'jog/src/types'

type MotorPolicyMap = Map<string, MotorPolicy>

export function syncMotorPolicies(uid: string, cb: (policies: MotorPolicyMap) => void) : () => void {
  const ref = firebase.database().ref('policies').orderByChild('uid').equalTo(uid)
  const listener = (snapshot) => {
    const val = snapshot.val()
    if (val) {
      cb(new Map(Object.entries(val)))
    } else {
      cb(new Map())
    }
  }
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export async function getMotorPolicies(uid: string) : Promise<MotorPolicyMap> {
  const ref = firebase.database().ref('policies').orderByChild('uid').equalTo(uid)
  const snapshot = await ref.once('value')
  return new Map(snapshot.val())
}

export function setMotorPolicy(policy: MotorPolicy) : Promise<void> {
  const id = policy.id
  if (id) { return firebase.database().ref(`policies/${id}`).set(policy) }
  throw new TypeError('Policy does not have an id')
}

export function setPolicies(uid: string, policies: {[id: string] : MotorPolicy}) : Promise<void> {
  const key = `policies/${uid}`
  console.debug(`firebase.set[${key}]`, policies)
  const ref = firebase.database().ref(key)
  return ref.set(policies)
}
