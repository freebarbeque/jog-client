/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import type {
  Dispatch,
  ReduxState,
  ValuesMap,
  ValidationErrorsMap,
} from 'jog/src/types'

import { setValues, setValidationErrors, passwordReset } from 'jog/src/store/screens/auth/actions'

import { BLUE } from 'jog/src/constants/palette'
import Text from 'jog/src/components/Text'
import { MARGIN } from 'jog/src/constants/style'

import { emailField } from 'jog/src/components/Form/fields'
import AccessoryButton from 'jog/src/components/AccessoryButton'
import Form from 'jog/src/components/Form/index'

type PasswordResetScreenProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  passwordResetError: string | null,
  loading: boolean,
};

class PasswordResetScreen extends Component {
  props: PasswordResetScreenProps

  static formFields = [
    emailField
  ]

  handleLoginPress = () => {
    this.props.dispatch(NavigationActions.back())
  }

  handleSubmit = (values) => {
    const { email } = values
    this.props.dispatch(passwordReset(email))
  }

  renderFormAccessory() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <AccessoryButton
          label="know your password?"
          onPress={this.handleLoginPress}
          disabled={this.props.loading}
        />
      </View>
    )
  }

  render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{ flexDirection: 'column', flex: 1, width: windowWidth, justifyContent: 'center' }}>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={styles.title}>
                Password Reset
              </Text>
            </View>
            <Form
              fields={PasswordResetScreen.formFields}
              buttonLabel="Send email"
              accessory={this.renderFormAccessory()}
              onSubmit={this.handleSubmit}
              error={this.props.passwordResetError}
              values={this.props.values}
              validationErrors={this.props.validationErrors}
              onValuesChanged={(values) => { this.props.dispatch(setValues(values)) }}
              onValidationErrorsChanged={(errors) => { this.props.dispatch(setValidationErrors(errors)) }}
              disabled={this.props.loading}
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
    flexDirection: 'column'
  },
  header: {
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10
  },
  headerLogo: {
    marginTop: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 20,
    fontWeight: '400'
  }
})

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(PasswordResetScreen)
