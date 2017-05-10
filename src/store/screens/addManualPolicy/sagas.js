// @flow

import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import uuid from 'uuid/v4'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'

import { setMotorPolicy } from 'jog/src/data/policies'
import { declareError } from 'jog/src/store/errors/actions'
import type { MotorPolicy } from 'jog/src/types'
import { demandCurrentUser } from 'jog/src/data/auth'

import type { ManualPolicyUpdate, SavePolicyAction } from './actions'

function* savePolicyTask(action: SavePolicyAction) {
  const policyUpdate: ManualPolicyUpdate = action.policy
  const policy: MotorPolicy = {}

  policy.ownership = policyUpdate.ownership
  policy.vehicleRegistration = policyUpdate.vehicleRegistration
  policy.noClaimsBonus = policyUpdate.noClaimsBonus
  policy.policyNo = policyUpdate.policyNo
  policy.expiryDate = moment(policyUpdate.expiryDate, 'DD/MM/YYYY').toDate().getTime()
  policy.companyId = policyUpdate.companyId
  policy.cost = parseFloat(policyUpdate.cost)
  policy.uid = demandCurrentUser().uid
  policy.noClaimsBonus = 0
  policy.id = uuid()

  try {
    yield call(() => setMotorPolicy(policy))
  } catch (e) {
    console.debug('Error saving policy', e)
    yield put(declareError('Unable to save policy'))
    return
  }

  yield put(NavigationActions.navigate({ routeName: 'Finished' }))
}

export function* addPolicySaga<T>(): Iterable<T> {
  yield takeLatest('addManualPolicy/SAVE_POLICY', savePolicyTask)
}
