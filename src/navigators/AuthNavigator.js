import React from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'

import LoginScreen from 'jog/src/screens/LoginScreen'
import RegisterScreen from 'jog/src/screens/RegisterScreen'
import ForgotPasswordScreen from 'jog/src/screens/PasswordResetScreen'
import { Logo, Times } from 'jog/src/components/images/index'
import { BLUE } from 'jog/src/constants/palette'
import ConfirmPasswordResetScreen from 'jog/src/screens/ConfirmPasswordResetScreen'
import { MARGIN } from 'jog/src/constants/style'

const authNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  ConfirmPasswordReset: { screen: ConfirmPasswordResetScreen },
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
})

authNavigator.navigationOptions = {
  header: () => {
    return {
      title: null,
      left: (
        <Logo
          style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
          scale={1}
        />
      ),
      style: { backgroundColor: BLUE }
    }
  },
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  }
}

export default authNavigator
