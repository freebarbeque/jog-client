// @flow

import type { PoliciesState } from 'jog/src/types'

export type ReceiveMotorPoliciesAction = {
  type: 'policies/RECEIVE_MOTOR_POLICIES',
  policies: PoliciesState,
}

export type SyncMotorPoliciesAction = {
  type: 'policies/SYNC_MOTOR_POLICIES',
  uid: string
}

export type UnsyncMotorPoliciesAction = {
  type: 'polices/UNSYNC_MOTOR_POLICIES'
}

export type PoliciesAction
  = ReceiveMotorPoliciesAction |
  SyncMotorPoliciesAction |
  UnsyncMotorPoliciesAction
