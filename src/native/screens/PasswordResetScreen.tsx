import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IReduxState, IValidationErrorsMap, IValuesMap } from '~/common/types'

import {
  passwordReset,
  setValidationErrors,
  setValues,
} from '~/common/store/screens/auth/actions'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import Text from '~/native/components/Text'

import AccessoryButton from '~/native/components/AccessoryButton'
import { emailField } from '~/native/components/Form/fields'
import Form from '~/native/components/Form/index'

interface IPasswordResetScreenProps extends DispatchProp<any> {
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  passwordResetError: string | null
  loading: boolean
  errors: { [key: string]: string }
}

class PasswordResetScreen extends React.Component<IPasswordResetScreenProps> {
  private static formFields = [emailField]

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
              <Text style={styles.title}>Password Reset</Text>
            </View>
            <Form
              fields={PasswordResetScreen.formFields}
              buttonLabel="Send email"
              accessory={this.renderFormAccessory()}
              onSubmit={this.handleSubmit}
              error={this.props.passwordResetError}
              values={this.props.values}
              validationErrors={this.props.validationErrors}
              onValuesChanged={values => {
                this.props.dispatch(setValues(values))
              }}
              onValidationErrorsChanged={errors => {
                this.props.dispatch(setValidationErrors(errors))
              }}
              disabled={this.props.loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  private handleLoginPress = () => {
    this.props.dispatch(NavigationActions.back())
  }

  private handleSubmit = values => {
    const { email } = values
    this.props.dispatch(passwordReset(email))
  }

  private renderFormAccessory() {
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
})

export default connect(mapStateToProps)(PasswordResetScreen)
