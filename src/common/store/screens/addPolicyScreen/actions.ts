export interface UploadPolicyAction {
  type: 'screens/addPolicyScreen/UPLOAD_POLICY'
}

export type AddPolicyScreenAction = UploadPolicyAction

export function uploadPolicy(): UploadPolicyAction {
  return {
    type: 'screens/addPolicyScreen/UPLOAD_POLICY',
  }
}
