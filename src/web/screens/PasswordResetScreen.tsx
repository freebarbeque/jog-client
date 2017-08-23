import { FlatButton } from 'material-ui'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Link } from 'react-router-dom'

import { DARK_GRAY } from '../../common/constants/palette'
import {
  passwordReset,
  setValidationErrors,
  setValues,
} from '../../common/store/screens/auth/actions'
import {
  IReduxState,
  IValidationErrorsMap,
  IValuesMap,
} from '../../common/types'
import { emailField } from '../../native/components/Form/fields'
import FlexCentredContainer from '../components/FlexCentredContainer'
import Form from '../components/Form'
import Title from '../components/Title'
import { NAVIGATION_BAR_HEIGHT } from '../constants/style'

interface IProps extends DispatchProp<any> {
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  passwordResetError: string | null
  loading: boolean
  errors: { [key: string]: string }
}

class PasswordResetScreen extends React.Component<IProps> {
  private static formFields = [emailField]

  public render() {
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

  private handleSubmit = values => {
    const { email } = values
    this.props.dispatch(passwordReset(email))
  }

  private renderFormAccessory() {
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
}

const mapStateToProps = (state: IReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(PasswordResetScreen)
