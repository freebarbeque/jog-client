import * as React from 'react'
import { connect } from 'react-redux'
import { FlatButton } from 'material-ui'
import { Link } from 'react-router-dom'

import {
  Dispatch,
  ReduxState,
  ValidationErrorsMap,
  ValuesMap,
} from '../../common/types'

import {
  emailField,
  nameField,
  validatedPasswordField,
} from '../../native/components/Form/fields'

import {
  register,
  setValidationErrors,
  setValues,
} from '../../common/store/screens/auth/actions'

import Form from '../components/Form'

import { DARK_GRAY } from '../../common/constants/palette'

import Title from '../components/Title'

import FlexCentredContainer from '../components/FlexCentredContainer'

import { NAVIGATION_BAR_HEIGHT } from '../constants/style'

type RegisterProps = {
  dispatch: Dispatch
  values: ValuesMap
  validationErrors: ValidationErrorsMap
  errors: { [key: string]: string }
  registerError: string | null
  loading: boolean
}

class RegisterScreen extends React.Component<RegisterProps> {
  static formFields = [
    nameField,
    emailField,
    {
      ...validatedPasswordField,
      inputProps: {
        ...validatedPasswordField.inputProps,
        type: 'password',
      },
    },
  ]

  handleSubmit = values => {
    // eslint-disable-next-line no-unused-vars
    const { name, email, password } = values // TODO: Do something with name
    this.props.dispatch(register(name, email, password))
  }

  renderFormAccessory() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <FlatButton
          style={{ fontWeight: 500, fontSize: 11, color: DARK_GRAY }}
          containerElement={<Link to="/auth/login" />}
        >
          GOT AN ACCOUNT?
        </FlatButton>
      </div>
    )
  }

  render() {
    return (
      <FlexCentredContainer style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}>
        <div>
          <Title>Register</Title>
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
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </div>
      </FlexCentredContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(RegisterScreen)
