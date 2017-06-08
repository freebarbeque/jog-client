// @flow

import firebase from 'firebase'

import type {
  MotorPolicy,
  MotorPolicyMap,
  PolicyDocument,
} from '../../common/types'

export function syncMotorPolicies(
  uid: string,
  cb: (policies: MotorPolicyMap) => void,
): () => void {
  const ref = firebase
    .database()
    .ref('policies')
    .orderByChild('uid')
    .equalTo(uid)
  const listener = snapshot => {
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

export async function getMotorPolicies(uid: string): Promise<MotorPolicyMap> {
  const ref = firebase
    .database()
    .ref('policies')
    .orderByChild('uid')
    .equalTo(uid)
  const snapshot = await ref.once('value')
  return snapshot.val()
}

export function setMotorPolicy(policy: MotorPolicy): Promise<void> {
  const id = policy.id
  if (id) {
    return firebase.database().ref(`policies/${id}`).set(policy)
  }
  throw new TypeError('Policy does not have an id')
}

export function updatePolicies(policies: {
  [id: string]: MotorPolicy,
}): Promise<void> {
  const ref = firebase.database().ref('policies')
  return ref.update(policies)
}

export async function clearPolicies(uid: string): Promise<void> {
  const policiesRef = firebase.database().ref('policies')
  const ref = policiesRef.orderByChild('uid').equalTo(uid)
  const snapshot = await ref.once('value')
  const promises = []
  snapshot.forEach(childSnapshot => {
    promises.push(policiesRef.child(childSnapshot.key).remove())
  })
  await Promise.all(promises)
}

export function addPolicyDocument(
  policyId: string,
  policyDocument: PolicyDocument,
): Promise<void> {
  const documentId = policyDocument.id
  const policiesRef = firebase.database().ref('policies').child(policyId)
  return policiesRef.child('documents').child(documentId).set(policyDocument)
}

export function removePolicyDocument(
  policyId: string,
  documentId: string,
): Promise<void> {
  const policiesRef = firebase.database().ref('policies').child(policyId)
  return policiesRef.child('documents').child(documentId).remove()
}

export async function getPolicyDocument(
  policyId: string,
  documentId: string,
): Promise<PolicyDocument> {
  const policiesRef = firebase.database().ref('policies').child(policyId)
  const snapshot = await policiesRef
    .child('documents')
    .child(documentId)
    .once('value')
  const document = snapshot.val()
  document.id = snapshot.key
  return document
}
