import * as moment from 'moment'
import { call, put, takeLatest } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import { demandCurrentUser } from '../../../data/auth'
import { setMotorPolicy } from '../../../data/policies'
import { IMotorPolicy } from '../../../types'
import { declareError } from '../../errors/actions'

import { getNavigationAdapter } from '../../index'
import { IManualPolicyUpdate, ISavePolicyAction } from './actions'

function* savePolicyTask(action: ISavePolicyAction) {
  const policyUpdate: IManualPolicyUpdate = action.policy
  const policy: IMotorPolicy = {}

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
