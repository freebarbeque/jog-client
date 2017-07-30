import { push } from 'react-router-redux'

export class WebNavigationAdapter {
  static navigateToAuthFinished() {
    return push('/auth/verify')
  }

  static navigateToAuth() {
    return push('/auth')
  }

  // eslint-disable-next-line no-unused-vars
  static navigateToPolicyDetails(policyId: string, policyIndex: number) {}

  static navigateToEmailVerification() {
    return push('/auth/verify')
  }

  static navigateToConfirmPasswordReset() {
    return push('/auth/confirmForgotPassword')
  }

  static hideAuthModal() {
    return push('/app')
  }
  static navigateToPolicyFinished() {
    return push('/app/addManualPolicy/finished')
  }
}
