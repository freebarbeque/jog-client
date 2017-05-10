// @flow

export type MotorPolicyOwnership = 'owned' | 'leased' | 'financed'

export type ManualPolicyUpdate = {
  vehicleRegistration?: string,
  ownership?: MotorPolicyOwnership,
  noClaimsBonus?: number,
  policyNo?: string,
  expiryDate?: number,
  companyId?: string,
  cost?: string,
}

export type UpdateManualPolicy = {
  type: 'addManualPolicy/UPDATE_MANUAL_POLICY',
  update: ManualPolicyUpdate
}

export type ClearManualPolicy = {
  type: 'addManualPolicy/CLEAR_MANUAL_POLICY',
}

export type AddManualPolicyAction = UpdateManualPolicy | ClearManualPolicy

export function updateManualPolicy(update: ManualPolicyUpdate) : UpdateManualPolicy {
  return {
    type: 'addManualPolicy/UPDATE_MANUAL_POLICY',
    update
  }
}

export function clearManualPolicy() : ClearManualPolicy {
  return {
    type: 'addManualPolicy/CLEAR_MANUAL_POLICY',
  }
}

