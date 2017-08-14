import * as firebase from 'firebase'

import Logger, { Levels } from '~/common/Logger'
import { IMotorPolicy, IMotorPolicyMap, IPolicyDocument } from '../types'

const log = new Logger('common/data/policies', Levels.TRACE)

export function syncMotorPolicies(
  uid: string,
  cb: (policies: IMotorPolicyMap) => void,
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

export async function getMotorPolicies(uid: string): Promise<IMotorPolicyMap> {
  const ref = firebase
    .database()
    .ref('policies')
    .orderByChild('uid')
    .equalTo(uid)
  const snapshot = await ref.once('value')
  return snapshot.val()
}

export async function setMotorPolicy(policy: IMotorPolicy): Promise<void> {
  const id = policy.id
  if (id) {
    log.trace(`saving policy with id ${id}`)
    await firebase.database().ref(`policies/${id}`).set(policy)
    log.debug(`saved policy with id ${id}`)
    return
  }
  throw new TypeError('Policy does not have an id')
}

export function updatePolicies(policies: { [id: string]: IMotorPolicy }) {
  const ref = firebase.database().ref('policies')
  return ref.update(policies)
}

export async function clearPolicies(uid: string): Promise<any> {
  const policiesRef = firebase.database().ref('policies')
  const ref = policiesRef.orderByChild('uid').equalTo(uid)
  const snapshot = await ref.once('value')
  const promises: Array<firebase.Promise<any>> = []
  snapshot.forEach(childSnapshot => {
    promises.push(policiesRef.child(childSnapshot.key).remove())
  })
  await Promise.all(promises)
}

export function addPolicyDocument(
  policyId: string,
  policyDocument: IPolicyDocument,
) {
  const documentId = policyDocument.id
  if (!policyDocument) throw new Error('Must pass policy document')
  if (!documentId) throw new Error(`Policy document must have an id`)
  if (!policyId) throw new Error(`Must pass policyId`)
  const policiesRef = firebase.database().ref('policies').child(policyId)
  return policiesRef.child('documents').child(documentId).set(policyDocument)
}

export function removePolicyDocument(policyId: string, documentId: string) {
  const policiesRef = firebase.database().ref('policies').child(policyId)
  return policiesRef.child('documents').child(documentId).remove()
}

export async function getPolicyDocument(
  policyId: string,
  documentId: string,
): Promise<IPolicyDocument> {
  const policiesRef = firebase.database().ref('policies').child(policyId)
  const snapshot = await policiesRef
    .child('documents')
    .child(documentId)
    .once('value')
  const document = snapshot.val()
  document.id = snapshot.key
  return document
}
