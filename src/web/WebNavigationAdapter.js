// @flow

import { push } from 'react-router-redux'

import type { NavigationAdapter } from '../common/types'

export class WebNavigationAdapter implements NavigationAdapter {
  static navigateToAuthFinished() {
    return push('/auth/verify')
  }

  static navigateToAuth() {
    return push('/auth')
  }

  // eslint-disable-next-line no-unused-vars
  static navigateToPolicyDetails(policyId: string, policyIndex: number) {}

  static navigateToEmailVerification() {}

  static navigateToConfirmPasswordReset() {}

  static hideAuthModal() {
    return push('/app')
  }
}
