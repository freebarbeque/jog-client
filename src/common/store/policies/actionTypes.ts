import { IMotorPolicyMap } from '../../types'

export interface IReceiveMotorPoliciesAction {
  type: 'policies/RECEIVE_MOTOR_POLICIES'
  policies: IMotorPolicyMap
}

export interface ISyncMotorPoliciesAction {
  type: 'policies/SYNC_MOTOR_POLICIES'
  uid: string
}

export interface IUnsyncMotorPoliciesAction {
  type: 'policies/UNSYNC_MOTOR_POLICIES'
}

export interface IUploadPolicyDocumentAction {
  type: 'policies/UPLOAD_POLICY_DOCUMENT'
  fileUrl?: string
  file?: any
  extension?: string
  fileName?: string
  policyId: string
}

export interface IUploadPolicyDocumentsAction {
  type: 'policies/UPLOAD_POLICY_DOCUMENTS'
  files: any[]
  policyId: string
}

export interface IDeletePolicyDocumentAction {
  type: 'policies/DELETE_POLICY_DOCUMENT'
  policyId: string
  documentId: string
}

export type PoliciesAction =
  | IReceiveMotorPoliciesAction
  | ISyncMotorPoliciesAction
  | IUnsyncMotorPoliciesAction
  | IUploadPolicyDocumentAction
  | IUploadPolicyDocumentsAction
  | IDeletePolicyDocumentAction
