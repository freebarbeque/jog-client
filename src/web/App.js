import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'

import MainScreen from './screens/MainScreen/index'
import AuthScreen from './screens/AuthScreen'
import { BLUE } from '../common/constants/palette'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  background: ${BLUE};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }
  
  a {
    color: white;
    text-decoration: none;
  
    &:hover {
      text-decoration: underline;
    }
  
    &:hover, &:visited, &:active {
      color: white;
    }
  }
  
  p {
    color: white;
  }
`

class App extends Component {
  render() {
    return (
      <Container>
        <Route path="/" exact render={() => <Redirect to="/app" />} />
        <Route path="/app" component={MainScreen} />
        <Route path="/auth" component={AuthScreen} />
      </Container>
    )
  }
}

export default App
