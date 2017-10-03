import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import {
  Dispatch,
  IReduxState,
  IValidationErrorsMap,
  IValuesMap,
} from '~/common/types'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import {
  register,
  setValidationErrors,
  setValues,
} from '~/common/store/screens/auth/actions'
import AccessoryButton from '~/native/components/AccessoryButton'
import Form from '~/native/components/Form'
import { Logo } from '~/native/components/images'
import Text from '~/native/components/Text'

import {
  emailField,
  nameField,
  validatedPasswordField,
} from '~/native/components/Form/fields'

interface IRegisterProps {
  dispatch: Dispatch
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  registerError: string | null
  loading: boolean
  errors: { [key: string]: string }
}

class RegisterScreen extends React.Component<IRegisterProps> {
  // tslint:disable-next-line:no-unused-variable
  public static navigationOptions = {
    title: null,
    headerLeft: (
      <Logo
        style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
        scale={1}
      />
    ),
    headerStyle: { backgroundColor: BLUE },
  }

  private static formFields = [nameField, emailField, validatedPasswordField]

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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>Register</Text>
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

  private handleLoginPress = () => {
    this.props.dispatch(NavigationActions.back())
  }

  private handleSubmit = values => {
    // eslint-disable-next-line no-unused-vars
    const { name, email, password } = values // TODO: Do something with name
    this.props.dispatch(register(name, email, password))
  }

  private renderFormAccessory() {
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

export default connect(mapStateToProps)(RegisterScreen)
