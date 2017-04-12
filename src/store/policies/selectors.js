// @flow

import { createSelector } from 'reselect'
import type { PoliciesState, ReduxState, InsurersReduxState, MotorPolicy } from 'jog/src/types'

export type SelectedMotorPolicy = MotorPolicy & {
  companyLogo: string | null
}

export type SelectedMotorPolicyMap = {
  [id: string]: SelectedMotorPolicy
}

export const selectPolicies : () => SelectedMotorPolicyMap = createSelector(
  (state: ReduxState) => state.policies,
  (state: ReduxState) => state.insurers,
  (policiesState: PoliciesState, insurersState: InsurersReduxState) => {
    const policies = policiesState.policies
    const insurers = insurersState.insurers
    const selectedPolicies: {[id: string]: SelectedMotorPolicy} = {}

    if (insurers) {
      _.forEach(policies, (p: MotorPolicy, id: string) => {
        const insurer = insurers[p.companyId]
        const companyLogo = insurer.logo || null
        selectedPolicies[id] = {
          ...p,
          companyLogo
        }
      })
    }
    return selectedPolicies
  }
)
