import { push } from 'react-router-redux'

export class WebNavigationAdapter {
  public static navigateToAuthFinished() {
    return push('/auth/verify')
  }

  public static navigateToAuth() {
    return push('/auth')
  }

  // eslint-disable-next-line no-unused-vars
  public static navigateToPolicyDetails() {
    // TODO?
  }

  public static navigateToEmailVerification() {
    return push('/auth/verify')
  }

  public static navigateToConfirmPasswordReset() {
    return push('/auth/confirmForgotPassword')
  }

  public static hideAuthModal() {
    return push('/app')
  }
  public static navigateToPolicyFinished() {
    return push('/app/addManualPolicy/finished')
  }
}
