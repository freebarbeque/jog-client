import React from 'react'
import { StackNavigator } from 'react-navigation'

import LoginScreen from 'jog/src/screens/LoginScreen'
import RegisterScreen from 'jog/src/screens/RegisterScreen'
import ForgotPasswordScreen from 'jog/src/screens/PasswordResetScreen'
import EmailVerificationScreen from 'jog/src/screens/EmailVerificationScreen'
import ConfirmPasswordResetScreen from 'jog/src/screens/ConfirmPasswordResetScreen'
import AuthHomeScreen from 'jog/src/screens/AuthHomeScreen'

import { Logo } from '../components/images/index'
import { MARGIN } from '../constants/style'
import { BLUE } from '../constants/palette'

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

authNavigator.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes
  const isHomeScreen = routes.length === 1 && routes[0].routeName === 'Home'

  let opts = {
    cardStack: {
      // Should not be able to pull down to dismiss the auth modal.
      gesturesEnabled: false
    }
  }

  if (isHomeScreen) {
    opts.header = null
  } else {
    opts = {
      ...opts,
      headerTitle: null,
      headerLeft: (
        <Logo
          style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
          scale={1}
        />
      ),
      headerStyle: { backgroundColor: BLUE }
    }
  }

  return opts
}

export default authNavigator
