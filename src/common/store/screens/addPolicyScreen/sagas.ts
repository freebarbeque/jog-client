import { takeLatest, call, put } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import { MotorPolicy } from '../../../types'
import { declareError } from '../../errors/actions'
import { setMotorPolicy } from '../../../data/policies'
import { getNavigationAdapter } from '../../index'
import { demandCurrentUser } from '../../../data/auth'

function* uploadPolicyTask() {
  const policy: MotorPolicy = {}
  policy.id = uuid()
  policy.uid = demandCurrentUser().uid

  console.log('policy', policy)

  try {
    yield call(() => setMotorPolicy(policy))
  } catch (e) {
    console.log('Error saving policy', e)
    yield put(declareError('Unable to create policy'))
  }

  console.log('navigating to policy')

  const id = policy.id
  if (id) {
    yield put(getNavigationAdapter().navigateToPolicyDetails(id, 0, true))
  } else {
    throw new Error('Cannot upload to a policy that has no id')
  }
}

export function* addPolicyScreenSaga() {
  yield takeLatest('screens/addPolicyScreen/UPLOAD_POLICY', uploadPolicyTask)
}
