// @flow

import type { MotorPolicyMap } from 'jog/src/types'

import type {
  DeletePolicyDocumentAction,
  ReceiveMotorPoliciesAction,
  SyncMotorPoliciesAction,
  UnsyncMotorPoliciesAction,
  UploadPolicyDocumentAction,
} from './actionTypes'

export function receiveMotorPolicies(
  policies: MotorPolicyMap,
): ReceiveMotorPoliciesAction {
  return {
    type: 'policies/RECEIVE_MOTOR_POLICIES',
    policies,
  }
}

export function syncMotorPolicies(uid: string): SyncMotorPoliciesAction {
  return {
    type: 'policies/SYNC_MOTOR_POLICIES',
    uid,
  }
}

export function unsyncMotorPolicies(): UnsyncMotorPoliciesAction {
  return {
    type: 'policies/UNSYNC_MOTOR_POLICIES',
  }
}

type UploadPolicyDocumentOptions = {
  fileUrl: string,
  extension: string,
  fileName: string,
  policyId: string,
}

export function uploadPolicyDocument(
  opts: UploadPolicyDocumentOptions,
): UploadPolicyDocumentAction {
  return {
    type: 'policies/UPLOAD_POLICY_DOCUMENT',
    ...opts,
  }
}

export function deletePolicyDocument(
  policyId: string,
  documentId: string,
): DeletePolicyDocumentAction {
  return {
    type: 'policies/DELETE_POLICY_DOCUMENT',
    documentId,
    policyId,
  }
}
