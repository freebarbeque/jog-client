// @flow

import { createSelector } from 'reselect'
import _ from 'lodash'

import type {
  PoliciesState,
  ReduxState,
  InsurersReduxState,
  MotorPolicy,
  MotorPolicyMap,
} from '../../types'

/**
 * Evaluates a policy returning true if all important details are present
 *
 * @param {MotorPolicy} policy
 * @returns boolean - true if all policy details are present
 */
function policyIsComplete(policy: MotorPolicy): boolean {
  return !!(
    (policy.drivers || []).length &&
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
        let companyLogo = null
        let companyName = null

        const insurer = companyId ? insurers[companyId] : null

        if (insurer) {
          companyLogo = (insurer && insurer.logo) || null
          companyName = (insurer && insurer.name) || null
        }

        selectedPolicies[id] = {
          ...p,
          companyLogo,
          companyName,
          complete: policyIsComplete(p),
        }
      })
    }
    return selectedPolicies
  },
)

export const selectInitialisedPolicies: () => MotorPolicyMap = createSelector(
  selectPolicies,
  (policies: MotorPolicyMap) => {
    const selectedPolicies: MotorPolicyMap = {}

    const filteredPolicies = _.filter(_.values(policies), p => {
      return p.companyId || p.documents
    })

    filteredPolicies.forEach(p => {
      selectedPolicies[p.id] = p
    })

    return selectedPolicies
  },
)
