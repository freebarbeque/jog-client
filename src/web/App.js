// @flow

import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import MainScreen from './screens/MainScreen/index'
import AuthScreen from './screens/AuthScreen'
import { BLUE } from '../common/constants/palette'
import type { Dispatch, FirebaseUser, ReduxState } from '../common/types'
import { syncData } from '../common/store/actions'
import history from './history'

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

type AppProps = {
  user: FirebaseUser | null,
  initialised: boolean,
  dispatch: Dispatch,
}

class App extends Component {
  props: AppProps

  componentDidMount() {
    this.props.dispatch(syncData())
  }

  render() {
    return this.props.initialised
      ? <ConnectedRouter history={history}>
          <Container>
            <Route
              path="/"
              exact
              render={() => {
                const user = this.props.user
                if (user && user.emailVerified) {
                  return <Redirect to={'/app'} />
                }
                return <Redirect to={'/auth'} />
              }}
            />
            <Route
              path="/app"
              render={() => {
                // Prevent access to main screens if not logged in
                const user = this.props.user
                if (!user || (user && !user.emailVerified)) {
                  return <Redirect to={'/auth'} />
                }
                return null
              }}
            />
            <Route path="/app" component={MainScreen} />
            <Route path="/auth" component={AuthScreen} />
          </Container>
        </ConnectedRouter>
      : <div>Loading...</div>
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  initialised: state.auth.initialised,
})

export default connect(mapStateToProps)(App)
