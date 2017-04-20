// @flow

import type { MotorPolicyMap, MotorPolicy, PolicyDocument } from 'jog/src/types'

import type {
  DeletePolicyDocumentAction,
  ReceiveMotorPoliciesAction,
  SyncMotorPoliciesAction,
  UnsyncMotorPoliciesAction,
  UploadPolicyDocumentAction
} from './actionTypes'

export function receiveMotorPolicies(policies: MotorPolicyMap) : ReceiveMotorPoliciesAction {
  return {
    type: 'policies/RECEIVE_MOTOR_POLICIES',
    policies,
  }
}

export function syncMotorPolicies(uid: string) : SyncMotorPoliciesAction {
  return {
    type: 'policies/SYNC_MOTOR_POLICIES',
    uid
  }
}

export function unsyncMotorPolicies() : UnsyncMotorPoliciesAction {
  return {
    type: 'policies/UNSYNC_MOTOR_POLICIES'
  }
}

export function uploadPolicyDocument(fileUrl: string, policyId: string): UploadPolicyDocumentAction {
  return {
    type: 'policies/UPLOAD_POLICY_DOCUMENT',
    fileUrl,
    policyId,
  }
}

export function deletePolicyDocument(policyId: string, documentId: string): DeletePolicyDocumentAction {
  return {
    type: 'policies/DELETE_POLICY_DOCUMENT',
    documentId,
    policyId,
  }
}
