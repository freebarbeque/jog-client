// @flow

import React, { Component } from 'react'
import { addNavigationHelpers, NavigationActions, StackNavigator } from 'react-navigation'
import FadeInView from 'react-native-fade-in-view'
import { connect } from 'react-redux'
import type { AuthReduxState, Dispatch, NavReduxState, ReduxState, FirebaseUser } from '../types'
import LoadingScreen from '../screens/LoadingScreen'
import { BLUE } from '../constants/palette'

import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import PolicyDocumentScreen from '../screens/PolicyDocumentScreen'

export const RootStackNavigator = StackNavigator({
  Tabs: { screen: TabNavigator },
  Auth: { screen: AuthNavigator },
  PolicyDocument: { screen: PolicyDocumentScreen },
}, {
  initialRouteName: 'Tabs',
  mode: 'modal',
  headerMode: 'screen',
})

type RootNavigatorProps = {
  dispatch: Dispatch,
  nav: NavReduxState,
  auth: AuthReduxState,
}

type RootNavigatorState = {
  initialised: boolean,
}

class RootNavigator extends Component {
  props: RootNavigatorProps
  state: RootNavigatorState

  constructor(props) {
    super(props)
    this.state = { initialised: false }
  }

  componentDidMount() {
    const auth = this.props.auth
    const { user, initialised } = auth
    if (initialised) {
      this.configureNavigationStack(user)
    }
  }

  componentWillReceiveProps(props: RootNavigatorProps) {
    const { user, initialised } = props.auth

    const authDidInitialise = !this.props.auth.initialised && initialised

    if (authDidInitialise) {
      this.configureNavigationStack(user)
    }
  }

  configureNavigationStack(user: FirebaseUser | null) {
    if (!user) {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
    } else if (!user.emailVerified) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Auth',
          action: NavigationActions.navigate({
            routeName: 'EmailVerification'
          })
        })
      )
    }
    this.delayedInitialisation()
  }

  delayedInitialisation() {
    // Super hacky way to avoid showing the modal animation - seems to impossible to remove i.e.
    // there is no property you can pass to the navigate action above that disables the animation!
    setTimeout(() => {
      this.setState({
        initialised: true
      })
    }, 300)
  }

  render() {
    const { dispatch, nav } = this.props
    const { initialised } = this.state

    // Fade in the root navigation once the login modal is ready.
    if (initialised) {
      return (
        <FadeInView style={{ flex: 1, backgroundColor: BLUE }} duration={300}>
          <RootStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
        </FadeInView>
      )
    }

    return (
      <LoadingScreen />
    )
  }
}

export default connect((state: ReduxState) => ({
  nav: state.nav,
  auth: state.auth
}))(RootNavigator)
