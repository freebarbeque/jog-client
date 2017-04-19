// @ flow

import type { MotorPolicyMap } from 'jog/src/types'

import type {
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

export function uploadPolicyDocument(fileUrl, policyId): UploadPolicyDocumentAction {
  return {
    type: 'policies/UPLOAD_POLICY_DOCUMENT',
    fileUrl,
    policyId,
  }
}

