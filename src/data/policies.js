// @flow

import firebase from 'firebase'
import type { MotorPolicy } from 'jog/src/types'

type MotorPolicyMap = Map<string, MotorPolicy>

export function syncMotorPolicies(uid: string, cb: (policies: MotorPolicyMap) => void) : () => void {
  const ref = firebase.database().ref('policy').orderByChild('uid').equalTo(uid)
  const listener = (snapshot) => cb(new Map(snapshot.val()))
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export async function getMotorPolicies(uid: string) : Promise<MotorPolicyMap> {
  const ref = firebase.database().ref('policy').orderByChild('uid').equalTo(uid)
  const snapshot = await ref.once('value')
  return new Map(snapshot.val())
}

export function setMotorPolicy(policy: MotorPolicy) : Promise<void> {
  return firebase.database().ref(`policy/${policy.policyId}`).set(policy)
}
