import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatButton } from 'material-ui'
import { Link } from 'react-router-dom'

import {
  Dispatch,
  ReduxState,
  ValidationErrorsMap,
  ValuesMap,
} from '../../common/types'
import { emailField } from '../../native/components/Form/fields'
import {
  passwordReset,
  setValidationErrors,
  setValues,
} from '../../common/store/screens/auth/actions'
import { DARK_GRAY } from '../../common/constants/palette'
import Form from '../components/Form'
import Title from '../components/Title'
import { NAVIGATION_BAR_HEIGHT } from '../constants/style'
import FlexCentredContainer from '../components/FlexCentredContainer'

type PasswordResetScreenProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  passwordResetError: string | null,
  loading: boolean,
}

class PasswordResetScreen extends Component {
  props: PasswordResetScreenProps

  static formFields = [emailField]

  handleSubmit = values => {
    const { email } = values
    this.props.dispatch(passwordReset(email))
  }

  renderFormAccessory() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FlatButton
          style={{ fontWeight: 500, fontSize: 11, color: DARK_GRAY }}
          containerElement={<Link to="/auth/login" />}
        >
          KNOW YOUR PASSWORD?
        </FlatButton>
      </div>
    )
  }

  render() {
    return (
      <FlexCentredContainer style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}>
        <Title>Password Reset</Title>
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
      </FlexCentredContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(PasswordResetScreen)
