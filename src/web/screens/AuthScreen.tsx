import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'

import AuthHome from './AuthHomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

import { IFirebaseUser, IReduxState } from '../../common/types'
import AuthNavBar from '../components/AuthNavBar'
import ConfirmPasswordResetScreen from './ConfirmPasswordResetScreen'
import EmailVerificationScreen from './EmailVerificationScreen'
import PasswordResetScreen from './PasswordResetScreen'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface IAuthScreenProps extends DispatchProp<any> {
  user: IFirebaseUser | null
  initialised: boolean
}

class AuthScreen extends React.Component<IAuthScreenProps> {
  public render() {
    return (
      <Container>
        <Route path="/auth(/?.+)" component={AuthNavBar} />
        <Route
          path="/auth"
          render={() => {
            // User should not have access to auth if logged in
            const user = this.props.user
            if (this.props.initialised && user && user.emailVerified)
              return <Redirect to="/app" />
            else if (user && !user.emailVerified)
              return <Redirect to="/auth/verify" />
            return null
          }}
        />
        <Route path="/auth" exact component={AuthHome} />
        <Route path="/auth/login" component={LoginScreen} />
        <Route path="/auth/verify" component={EmailVerificationScreen} />
        <Route path="/auth/register" component={RegisterScreen} />
        <Route path="/auth/forgotPassword" component={PasswordResetScreen} />
        <Route
          path="/auth/confirmForgotPassword"
          component={ConfirmPasswordResetScreen}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  user: state.auth.user,
  initialised: state.auth.initialised,
})

export default connect(mapStateToProps)(AuthScreen)
