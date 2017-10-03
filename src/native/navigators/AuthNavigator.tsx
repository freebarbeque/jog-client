import * as React from 'react'
import { StackNavigator } from 'react-navigation'

import AuthHomeScreen from '~/native/screens/AuthHomeScreen'
import ConfirmPasswordResetScreen from '~/native/screens/ConfirmPasswordResetScreen'
import EmailVerificationScreen from '~/native/screens/EmailVerificationScreen'
import LoginScreen from '~/native/screens/LoginScreen'
import ForgotPasswordScreen from '~/native/screens/PasswordResetScreen'
import RegisterScreen from '~/native/screens/RegisterScreen'

import { BLUE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { Logo } from '../components/images/index'

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

  let opts: any = {
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
