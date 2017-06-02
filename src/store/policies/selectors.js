// @flow

import { createSelector } from 'reselect'
import type {
  PoliciesState,
  ReduxState,
  InsurersReduxState,
  MotorPolicy,
  MotorPolicyMap,
} from 'jog/src/types'
import _ from 'lodash'

/**
 * Evaluates a policy returning true if all important details are present
 *
 * @param {MotorPolicy} policy
 * @returns boolean - true if all policy details are present
 */
function policyIsComplete(policy: MotorPolicy): boolean {
  return (
    _.values(policy.drivers).length &&
    policy.companyId &&
    policy.policyNo &&
    policy.levelOfCover &&
    policy.vehicleRegistration &&
    policy.noClaimsBonus !== undefined &&
    policy.noClaimsBonus !== null &&
    policy.expiryDate &&
    _.values(policy.documents).length &&
    policy.excess &&
    policy.cost &&
    policy.ownership
  )
}

export const selectPolicies: () => MotorPolicyMap = createSelector(
  (state: ReduxState) => state.policies,
  (state: ReduxState) => state.insurers,
  (policiesState: PoliciesState, insurersState: InsurersReduxState) => {
    const policies = policiesState.policies
    const insurers = insurersState.insurers
    const selectedPolicies: MotorPolicyMap = {}

    if (insurers) {
      _.forEach(policies, (p: MotorPolicy, id: string) => {
        const companyId = p.companyId
        if (companyId) {
          const insurer = insurers[companyId]

          const companyLogo = (insurer && insurer.logo) || null
          const companyName = (insurer && insurer.name) || null

          selectedPolicies[id] = {
            ...p,
            companyLogo,
            companyName,
            complete: policyIsComplete(p),
          }
        }
      })
    }
    return selectedPolicies
  },
)
