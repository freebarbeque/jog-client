export const motorPolicyOwnership = {
  owned: 'owned',
  leased: 'leased',
  financed: 'financed',
}

export type MotorPolicyOwnership = keyof typeof motorPolicyOwnership

export interface IManualPolicyUpdate {
  vehicleRegistration?: string
  ownership?: MotorPolicyOwnership
  noClaimsBonus?: number
  policyNo?: string
  expiryDate?: string
  companyId?: string
  cost?: string
}

export interface IUpdateManualPolicy {
  type: 'addManualPolicy/UPDATE_MANUAL_POLICY'
  update: IManualPolicyUpdate
}

export interface IClearManualPolicy {
  type: 'addManualPolicy/CLEAR_MANUAL_POLICY'
}

export interface ISavePolicyAction {
  type: 'addManualPolicy/SAVE_POLICY'
  policy: IManualPolicyUpdate
}

export type AddManualPolicyAction =
  | IUpdateManualPolicy
  | IClearManualPolicy
  | ISavePolicyAction

export function updateManualPolicy(
  update: IManualPolicyUpdate,
): IUpdateManualPolicy {
  return {
    type: 'addManualPolicy/UPDATE_MANUAL_POLICY',
    update,
  }
}

export function clearManualPolicy(): IClearManualPolicy {
  return {
    type: 'addManualPolicy/CLEAR_MANUAL_POLICY',
  }
}

export function savePolicy(policy: IManualPolicyUpdate): ISavePolicyAction {
  return {
    type: 'addManualPolicy/SAVE_POLICY',
    policy,
  }
}
