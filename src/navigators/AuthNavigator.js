import { StackNavigator } from 'react-navigation'

import LoginScreen from 'jog/src/screens/LoginScreen'
import RegisterScreen from 'jog/src/screens/RegisterScreen'
import ForgotPasswordScreen from 'jog/src/screens/PasswordResetScreen'
import EmailVerificationScreen from 'jog/src/screens/EmailVerificationScreen'
import ConfirmPasswordResetScreen from 'jog/src/screens/ConfirmPasswordResetScreen'
import AuthHomeScreen from 'jog/src/screens/AuthHomeScreen'

const authNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: AuthHomeScreen },
  Register: { screen: RegisterScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  ConfirmPasswordReset: { screen: ConfirmPasswordResetScreen },
  EmailVerification: { screen: EmailVerificationScreen },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
})

authNavigator.navigationOptions = {
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  }
}

export default authNavigator
