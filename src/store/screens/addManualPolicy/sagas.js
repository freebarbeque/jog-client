// @flow

import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import uuid from 'uuid/v4'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'

import type { ManualPolicyUpdate, SavePolicyAction } from './actions'
import { setMotorPolicy } from '../../../data/policies'
import { finishLoading, startLoading } from '../../loading/actions'
import { declareError } from '../../errors/actions'
import type { MotorPolicy } from '../../../types'
import { demandCurrentUser } from '../../../data/auth'

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

  yield put(startLoading('Saving policy'))
  try {
    yield call(() => setMotorPolicy(policy))
  } catch (e) {
    console.debug('Error saving policy', e)
    yield put(declareError('Unable to save policy'))
    return
  } finally {
    yield put(finishLoading())
  }

  yield put(NavigationActions.navigate({ routeName: 'Finished' }))
}

export function* addPolicySaga<T>(): Iterable<T> {
  yield takeLatest('addManualPolicy/SAVE_POLICY', savePolicyTask)
}
