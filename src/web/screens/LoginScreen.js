import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import {
  Dispatch,
  ReduxState,
  ValidationErrorsMap,
  ValuesMap,
} from '../../common/types'
import {
  login,
  setValidationErrors,
  setValues,
} from '../../common/store/screens/auth/actions'
import Form from '../components/Form'
import { emailField, passwordField } from '../../native/components/Form/fields'
import { DARK_GRAY } from '../../common/constants/palette'
import HorizontalFlexCenteredContainer from '../components/HorizontalFlexCenteredContainer'
import Title from '../components/Title'

type LoginProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  loginError: string | null,
  loading: boolean,
}

class LoginScreen extends Component {
  props: LoginProps

  static formFields = [
    emailField,
    {
      ...passwordField,
      inputProps: {
        ...passwordField.inputProps,
        type: 'password',
      },
    },
  ]

  handleSubmit = (values: ValuesMap) => {
    const { email, password } = values
    this.props.dispatch(login(email, password))
  }

  renderFormAccessory() {
    const accessoryStyle = { fontWeight: 500, fontSize: 11, color: DARK_GRAY }

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FlatButton
          style={accessoryStyle}
          containerElement={<Link to="/auth/forgotPassword" />}
        >
          FORGOT PASSWORD
        </FlatButton>
        <div style={{ flex: 1 }} />
        <FlatButton
          style={accessoryStyle}
          containerElement={<Link to="/auth/register" />}
        >
          REGISTER NOW
        </FlatButton>
      </div>
    )
  }

  render() {
    return (
      <HorizontalFlexCenteredContainer>
        <Title>
          Sign In
        </Title>
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </HorizontalFlexCenteredContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
  nav: state.nav,
})

export default connect(mapStateToProps)(LoginScreen)
