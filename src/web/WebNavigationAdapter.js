// @flow

import type { NavigationAdapter } from '../common/types'

export class WebNavigationAdapter implements NavigationAdapter {
  static navigateToAuthFinished() {}

  static navigateToAuth() {}

  // eslint-disable-next-line no-unused-vars
  static navigateToPolicyDetails(policyId: string, policyIndex: number) {}

  static navigateToEmailVerification() {}

  static navigateToConfirmPasswordReset() {}

  static hideAuthModal() {}
}
