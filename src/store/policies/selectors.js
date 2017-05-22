// @flow

import { createSelector } from 'reselect'
import type { PoliciesState, ReduxState, InsurersReduxState, MotorPolicy, MotorPolicyMap } from 'jog/src/types'

export const selectPolicies : () => MotorPolicyMap = createSelector(
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

          const companyLogo = insurer && insurer.logo || null
          const companyName = insurer && insurer.name || null

          selectedPolicies[id] = {
            ...p,
            companyLogo,
            companyName
          }
        }
      })
    }
    return selectedPolicies
  }
)
