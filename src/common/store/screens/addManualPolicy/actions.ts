export const motorPolicyOwnership = {
  owned: 'owned',
  leased: 'leased',
  financed: 'financed',
}

export type MotorPolicyOwnership = keyof typeof motorPolicyOwnership

export interface ManualPolicyUpdate {
  vehicleRegistration?: string
  ownership?: MotorPolicyOwnership
  noClaimsBonus?: number
  policyNo?: string
  expiryDate?: string
  companyId?: string
  cost?: string
}

export interface UpdateManualPolicy {
  type: 'addManualPolicy/UPDATE_MANUAL_POLICY'
  update: ManualPolicyUpdate
}

export interface ClearManualPolicy {
  type: 'addManualPolicy/CLEAR_MANUAL_POLICY'
}

export interface SavePolicyAction {
  type: 'addManualPolicy/SAVE_POLICY'
  policy: ManualPolicyUpdate
}

export type AddManualPolicyAction =
  | UpdateManualPolicy
  | ClearManualPolicy
  | SavePolicyAction

export function updateManualPolicy(
  update: ManualPolicyUpdate,
): UpdateManualPolicy {
  return {
    type: 'addManualPolicy/UPDATE_MANUAL_POLICY',
    update,
  }
}

export function clearManualPolicy(): ClearManualPolicy {
  return {
    type: 'addManualPolicy/CLEAR_MANUAL_POLICY',
  }
}

export function savePolicy(policy: ManualPolicyUpdate): SavePolicyAction {
  return {
    type: 'addManualPolicy/SAVE_POLICY',
    policy,
  }
}
