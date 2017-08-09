import * as _ from 'lodash'
import { createSelector } from 'reselect'

import {
  IMotorPolicy,
  IMotorPolicyMap,
  InsurersReduxState,
  IPoliciesState,
  IReduxState,
} from '../../types'

/**
 * Evaluates a policy returning true if all important details are present
 *
 * @param {IMotorPolicy} policy
 * @returns boolean - true if all policy details are present
 */
function policyIsComplete(policy: IMotorPolicy): boolean {
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

export const selectPolicies = createSelector(
  (state: IReduxState) => state.policies,
  (state: IReduxState) => state.insurers,
  (policiesState: IPoliciesState, insurersState: InsurersReduxState) => {
    const policies = policiesState.policies
    const insurers = insurersState.insurers
    const selectedPolicies: IMotorPolicyMap = {}

    if (insurers) {
      _.forEach(policies, (p: IMotorPolicy, id: string) => {
        const companyId = p.companyId
        let companyLogo: string | null = null
        let companyName: string | null = null

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

// $FlowFixMe
export const selectInitialisedPolicies = createSelector(
  selectPolicies,
  (policies: IMotorPolicyMap) => {
    const selectedPolicies: IMotorPolicyMap = {}

    const filteredPolicies = _.filter(_.values(policies), p => {
      return p.companyId || p.documents
    })

    filteredPolicies.forEach(p => {
      selectedPolicies[p.id] = p
    })

    return selectedPolicies
  },
)
