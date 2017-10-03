import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import {
  INavReduxState,
  IReduxState,
  IValidationErrorsMap,
  IValuesMap,
} from '~/common/types'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import {
  clear,
  login,
  setValidationErrors,
  setValues,
} from '~/common/store/screens/auth/actions'
import AccessoryButton from '~/native/components/AccessoryButton'
import Form from '~/native/components/Form'
import Text from '~/native/components/Text'

import { emailField, passwordField } from '~/native/components/Form/fields'

interface IProps extends DispatchProp<any> {
  loginError: string | null
  nav: INavReduxState
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  loading: boolean
  errors: { [key: string]: string }
}

class LoginScreen extends React.Component<IProps> {
  public static formFields = [emailField, passwordField]

  public componentWillUnmount() {
    this.props.dispatch(clear())
  }

  public render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
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
              <Text style={styles.title}>Sign in</Text>
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

  private handleForgotPasswordPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ForgotPassword',
      }),
    )
  }

  private handleRegisterNowPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Register',
      }),
    )
  }

  private handleSubmit = (values: IValuesMap) => {
    const { email, password } = values
    this.props.dispatch(login(email, password))
  }

  private renderFormAccessory() {
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

const mapStateToProps = (state: IReduxState) => ({
  ...state.screens.auth,
  nav: state.nav,
})

export default connect(mapStateToProps)(LoginScreen)
