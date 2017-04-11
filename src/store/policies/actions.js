// @ flow

import type { PoliciesState } from 'jog/src/types'

import type {
  ReceiveMotorPoliciesAction,
  SyncMotorPoliciesAction,
  UnsyncMotorPoliciesAction
} from './actionTypes'

export function receiveMotorPolicies(policies: PoliciesState) : ReceiveMotorPoliciesAction {
  return {
    type: 'policies/RECEIVE_MOTOR_POLICIES',
    policies,
  }
}

export function syncMotorPolicies(uid: string) : SyncMotorPoliciesAction {
  return {
    type: 'policies/SYNC_MOTOR_POLICIES',
    uid
  }
}

export function unsyncMotorPolicies() : UnsyncMotorPoliciesAction {
  return {
    type: 'policies/UNSYNC_MOTOR_POLICIES'
  }
}
