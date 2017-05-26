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
} from 'jog/src/types'

import {
  setValues,
  setValidationErrors,
  register,
} from 'jog/src/store/screens/auth/actions'
import { BLUE } from 'jog/src/constants/palette'
import Text from 'jog/src/components/Text'
import { MARGIN } from 'jog/src/constants/style'
import { authNavigationHeader } from 'jog/src/constants/headers'
import Form from 'jog/src/components/Form'
import AccessoryButton from 'jog/src/components/AccessoryButton'

import {
  emailField,
  nameField,
  validatedPasswordField,
} from 'jog/src/components/Form/fields'

type RegisterProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  registerError: string | null,
  loading: boolean,
}

class RegisterScreen extends Component {
  props: RegisterProps

  static navigationOptions = {
    ...authNavigationHeader,
  }

  static formFields = [nameField, emailField, validatedPasswordField]

  handleLoginPress = () => {
    this.props.dispatch(NavigationActions.back())
  }

  handleSubmit = values => {
    // eslint-disable-next-line no-unused-vars
    const { name, email, password } = values // TODO: Do something with name
    this.props.dispatch(register(name, email, password))
  }

  renderFormAccessory() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <AccessoryButton
          label="got an account?"
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
                Register
              </Text>
            </View>
            <Form
              fields={RegisterScreen.formFields}
              buttonLabel="Register"
              accessory={this.renderFormAccessory()}
              onSubmit={this.handleSubmit}
              error={this.props.registerError}
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
})

export default connect(mapStateToProps)(RegisterScreen)
