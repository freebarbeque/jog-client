import { MotorPolicyMap } from '../../types'

export interface ReceiveMotorPoliciesAction {
  type: 'policies/RECEIVE_MOTOR_POLICIES'
  policies: MotorPolicyMap
}

export interface SyncMotorPoliciesAction {
  type: 'policies/SYNC_MOTOR_POLICIES'
  uid: string
}

export interface UnsyncMotorPoliciesAction {
  type: 'policies/UNSYNC_MOTOR_POLICIES'
}

export interface UploadPolicyDocumentAction {
  type: 'policies/UPLOAD_POLICY_DOCUMENT'
  fileUrl?: string
  file?: any
  extension?: string
  fileName?: string
  policyId: string
}

export interface UploadPolicyDocumentsAction {
  type: 'policies/UPLOAD_POLICY_DOCUMENTS'
  files: any[]
  policyId: string
}

export interface DeletePolicyDocumentAction {
  type: 'policies/DELETE_POLICY_DOCUMENT'
  policyId: string
  documentId: string
}

export type PoliciesAction =
  | ReceiveMotorPoliciesAction
  | SyncMotorPoliciesAction
  | UnsyncMotorPoliciesAction
  | UploadPolicyDocumentAction
  | UploadPolicyDocumentsAction
  | DeletePolicyDocumentAction
