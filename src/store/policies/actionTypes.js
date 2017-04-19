// @flow

import type { MotorPolicyMap } from 'jog/src/types'

export type ReceiveMotorPoliciesAction = {
  type: 'policies/RECEIVE_MOTOR_POLICIES',
  policies: MotorPolicyMap,
}

export type SyncMotorPoliciesAction = {
  type: 'policies/SYNC_MOTOR_POLICIES',
  uid: string
}

export type UnsyncMotorPoliciesAction = {
  type: 'polices/UNSYNC_MOTOR_POLICIES'
}

export type UploadPolicyDocumentAction = {
  type: 'policies/UPLOAD_POLICY_DOCUMENT',
  fileUrl: string,
  policyId: string,
}

export type PoliciesAction
  = ReceiveMotorPoliciesAction |
  SyncMotorPoliciesAction |
  UnsyncMotorPoliciesAction |
  UploadPolicyDocumentAction
