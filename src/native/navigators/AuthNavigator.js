import React from 'react'
import { StackNavigator } from 'react-navigation'

import LoginScreen from 'jog/src/native/screens/LoginScreen'
import RegisterScreen from 'jog/src/native/screens/RegisterScreen'
import ForgotPasswordScreen from 'jog/src/native/screens/PasswordResetScreen'
import EmailVerificationScreen from 'jog/src/native/screens/EmailVerificationScreen'
import ConfirmPasswordResetScreen from 'jog/src/native/screens/ConfirmPasswordResetScreen'
import AuthHomeScreen from 'jog/src/native/screens/AuthHomeScreen'

import { Logo } from '../components/images/index'
import { MARGIN } from '../../common/constants/style'
import { BLUE } from '../../common/constants/palette'

const authNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: AuthHomeScreen },
    Register: { screen: RegisterScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    ConfirmPasswordReset: { screen: ConfirmPasswordResetScreen },
    EmailVerification: { screen: EmailVerificationScreen },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
)

authNavigator.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes
  const isHomeScreen = routes.length === 1 && routes[0].routeName === 'Home'

  let opts = {
    cardStack: {
      // Should not be able to pull down to dismiss the auth modal.
      gesturesEnabled: false,
    },
  }

  if (isHomeScreen) {
    opts.header = null
  } else {
    opts = {
      ...opts,
      headerTitle: null,
      headerLeft: (
        <Logo
          style={{ marginLeft: MARGIN.large, marginTop: MARGIN.base }}
          scale={1}
        />
      ),
      headerStyle: { backgroundColor: BLUE },
    }
  }

  return opts
}

export default authNavigator
