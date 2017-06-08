import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../../components/NavBar'
import Tabs from './Tabs'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default class MainScreen extends Component {
  render() {
    return (
      <Container>
        <Route
          path="/app"
          exact
          render={() => <Redirect to="/app/policies" />}
        />
        <Route
          path="/app"
          render={() => {
            return (
              <Container>
                <NavBar />
                <Tabs />
              </Container>
            )
          }}
        />
      </Container>
    )
  }
}
