export interface IUploadPolicyAction {
  type: 'screens/addPolicyScreen/UPLOAD_POLICY'
}

export type AddPolicyScreenAction = IUploadPolicyAction

export function uploadPolicy(): IUploadPolicyAction {
  return {
    type: 'screens/addPolicyScreen/UPLOAD_POLICY',
  }
}
