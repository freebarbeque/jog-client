import { takeLatest, call, put } from 'redux-saga/effects'
import uuid from 'uuid/v4'
import * as moment from 'moment'

import { setMotorPolicy } from '../../../data/policies'
import { declareError } from '../../errors/actions'
import { MotorPolicy } from '../../../types'
import { demandCurrentUser } from '../../../data/auth'

import { ManualPolicyUpdate, SavePolicyAction } from './actions'
import { getNavigationAdapter } from '../../index'

function* savePolicyTask(action: SavePolicyAction) {
  const policyUpdate: ManualPolicyUpdate = action.policy
  const policy: MotorPolicy = {}

  policy.ownership = policyUpdate.ownership
  policy.vehicleRegistration = policyUpdate.vehicleRegistration
  policy.noClaimsBonus = policyUpdate.noClaimsBonus
  policy.policyNo = policyUpdate.policyNo
  policy.expiryDate = moment(policyUpdate.expiryDate, 'DD/MM/YYYY')
    .toDate()
    .getTime()
  policy.companyId = policyUpdate.companyId
  policy.cost = parseFloat(policyUpdate.cost)
  policy.uid = demandCurrentUser().uid
  policy.noClaimsBonus = 0
  policy.id = uuid()

  try {
    yield call(() => setMotorPolicy(policy))
  } catch (e) {
    console.log('Error saving policy', e)
    yield put(declareError('Unable to save policy'))
    return
  }

  yield put(getNavigationAdapter().navigateToPolicyFinished())
}

export function* addPolicySaga() {
  yield takeLatest('addManualPolicy/SAVE_POLICY', savePolicyTask)
}
