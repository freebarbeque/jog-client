import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
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

import { MARGIN } from '../../common/constants/style'

type PasswordResetScreenProps = {
  dispatch: Dispatch,
  values: ValuesMap,
  validationErrors: ValidationErrorsMap,
  passwordResetError: string | null,
  loading: boolean,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// language=SCSS prefix=dummy{ suffix=}
const Title = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: ${MARGIN.large}px;
  font-weight: 400;
  color: white;
`

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
      <Container>
        <Title>
          Password Reset
        </Title>
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
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(PasswordResetScreen)
