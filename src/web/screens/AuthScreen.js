import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import LoginScreen from './LoginScreen'
import AuthHome from './AuthHomeScreen'
import RegisterScreen from './RegisterScreen'

import type { FirebaseUser, ReduxState } from '../../common/types'
import AuthNavBar from '../components/AuthNavBar'
import EmailVerificationScreen from './EmailVerificationScreen'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

type AuthScreenProps = {
  user: FirebaseUser | null,
  initialised: boolean,
}

class AuthScreen extends Component {
  props: AuthScreenProps

  render() {
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
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  initialised: state.auth.initialised,
})

export default connect(mapStateToProps)(AuthScreen)
