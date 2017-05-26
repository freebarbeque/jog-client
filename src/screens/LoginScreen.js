/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'

import type {
  Dispatch,
  ReduxState,
  ValuesMap,
  ValidationErrorsMap,
  NavReduxState,
} from 'jog/src/types'

import {
  setValues,
  setValidationErrors,
  clear,
  login,
} from 'jog/src/store/screens/auth/actions'
import { BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import Text from 'jog/src/components/Text'
import Form from 'jog/src/components/Form'
import AccessoryButton from 'jog/src/components/AccessoryButton'

import { emailField, passwordField } from 'jog/src/components/Form/fields'

type LoginProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  loginError: string | null,
  loading: boolean,
  nav: NavReduxState,
}

class LoginScreen extends Component {
  props: LoginProps

  static formFields = [emailField, passwordField]

  componentWillUnmount() {
    this.props.dispatch(clear())
  }

  handleForgotPasswordPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ForgotPassword',
      }),
    )
  }

  handleRegisterNowPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Register',
      }),
    )
  }

  handleSubmit = (values: ValuesMap) => {
    const { email, password } = values
    const routes = this.props.nav.routes
    const authRoute = _.find(routes, route => route.routeName === 'Auth')
    const key = authRoute.key
    this.props.dispatch(login(email, password, key))
  }

  renderFormAccessory() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <AccessoryButton
          label="forgot password"
          onPress={this.handleForgotPasswordPress}
          disabled={this.props.loading}
        />
        <View style={{ flex: 1 }} />
        <AccessoryButton
          label="register now"
          onPress={this.handleRegisterNowPress}
          disabled={this.props.loading}
        />
      </View>
    )
  }

  render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps={true}
      >
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            width: windowWidth,
            justifyContent: 'center',
          }}
        >
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>
                Sign in
              </Text>
            </View>
            <Form
              fields={LoginScreen.formFields}
              buttonLabel="Sign in"
              accessory={this.renderFormAccessory()}
              onSubmit={this.handleSubmit}
              error={this.props.loginError}
              disabled={this.props.loading}
              values={this.props.values}
              validationErrors={this.props.validationErrors}
              onValuesChanged={values => {
                this.props.dispatch(setValues(values))
              }}
              onValidationErrorsChanged={errors => {
                this.props.dispatch(setValidationErrors(errors))
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingTop: 20,
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerLogo: {
    marginTop: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 20,
    fontWeight: '400',
  },
})

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
  nav: state.nav,
})

export default connect(mapStateToProps)(LoginScreen)
