import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import LoginScreen from './LoginScreen'
import AuthHome from './AuthHomeScreen'
import RegisterScreen from './RegisterScreen'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

class AuthScreen extends Component {
  render() {
    return (
      <Container>
        <Route path="/auth" exact component={AuthHome} />
        <Route path="/auth/login" component={LoginScreen} />
        <Route path="/auth/register" component={RegisterScreen} />
      </Container>
    )
  }
}

export default AuthScreen
