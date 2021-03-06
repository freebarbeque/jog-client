import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Link } from 'react-router-dom'
import { DARK_GRAY } from '../../common/constants/palette'
import {
  login,
  setValidationErrors,
  setValues,
} from '../../common/store/screens/auth/actions'
import {
  IReduxState,
  IValidationErrorsMap,
  IValuesMap,
} from '../../common/types'
import { emailField, passwordField } from '../../native/components/Form/fields'
import FlexCenteredContainer from '../components/FlexCenteredContainer'
import Form from '../components/Form'
import Title from '../components/Title'
import { NAVIGATION_BAR_HEIGHT } from '../constants/style'

interface ILoginProps extends DispatchProp<any> {
  values: IValuesMap
  validationErrors: IValidationErrorsMap
  loginError: string | null
  loading: boolean
  errors: {
    [key: string]: string
  }
}

class LoginScreen extends React.Component<ILoginProps> {
  public static formFields = [
    emailField,
    {
      ...passwordField,
      inputProps: {
        ...passwordField.inputProps,
        type: 'password',
      },
    },
  ]

  public render() {
    return (
      <FlexCenteredContainer
        className="LoginScreen"
        style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}
      >
        <div className="LoginScreen__Inner">
          <Title>Sign In</Title>
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
        </div>
      </FlexCenteredContainer>
    )
  }

  private handleSubmit = (values: IValuesMap) => {
    const { email, password } = values
    this.props.dispatch(login(email, password))
  }

  private renderFormAccessory() {
    const accessoryStyle = { fontWeight: 500, fontSize: 11, color: DARK_GRAY }

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FlatButton
          style={accessoryStyle as any}
          containerElement={<Link to="/auth/forgotPassword" />}
        >
          FORGOT PASSWORD
        </FlatButton>
        <div style={{ flex: 1 }} />
        <FlatButton
          style={accessoryStyle as any}
          containerElement={<Link to="/auth/register" />}
        >
          REGISTER NOW
        </FlatButton>
      </div>
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  ...state.screens.auth,
})

export default connect(mapStateToProps)(LoginScreen)
