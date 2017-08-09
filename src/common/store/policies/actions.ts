import { IMotorPolicyMap } from '../../types'

import {
  IDeletePolicyDocumentAction,
  IReceiveMotorPoliciesAction,
  ISyncMotorPoliciesAction,
  IUnsyncMotorPoliciesAction,
  IUploadPolicyDocumentAction,
  IUploadPolicyDocumentsAction,
} from './actionTypes'

export function receiveMotorPolicies(
  policies: IMotorPolicyMap,
): IReceiveMotorPoliciesAction {
  return {
    type: 'policies/RECEIVE_MOTOR_POLICIES',
    policies,
  }
}

export function syncMotorPolicies(uid: string): ISyncMotorPoliciesAction {
  return {
    type: 'policies/SYNC_MOTOR_POLICIES',
    uid,
  }
}

export function unsyncMotorPolicies(): IUnsyncMotorPoliciesAction {
  return {
    type: 'policies/UNSYNC_MOTOR_POLICIES',
  }
}

interface IUploadPolicyDocumentOptions {
  fileUrl?: string
  extension?: string
  fileName?: string
  file?: any
  policyId: string
}

export function uploadPolicyDocuments(
  files: any[],
  policyId: string,
): IUploadPolicyDocumentsAction {
  return {
    type: 'policies/UPLOAD_POLICY_DOCUMENTS',
    files,
    policyId,
  }
}

export function uploadPolicyDocument(
  opts: IUploadPolicyDocumentOptions,
): IUploadPolicyDocumentAction {
  return {
    type: 'policies/UPLOAD_POLICY_DOCUMENT',
    ...opts,
  }
}

export function deletePolicyDocument(
  policyId: string,
  documentId: string,
): IDeletePolicyDocumentAction {
  return {
    type: 'policies/DELETE_POLICY_DOCUMENT',
    documentId,
    policyId,
  }
}
