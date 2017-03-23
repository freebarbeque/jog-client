/* @flow */

import React, { Component } from 'react'
import Expo from 'expo'
import { connect } from 'react-redux'
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation'
import type { Dispatch } from '../redux/typedefs'
import { userSubscribe } from '../data/auth'
import router from '../router'

type RootProps = {
  dispatch: Dispatch,
};
type RootState = {};

class Root extends Component {
  props: RootProps
  state: RootState

  constructor(props: RootProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    userSubscribe((user) => {
      this.props.dispatch({
        type: 'RECEIVE_USER',
        user,
      })
    })
  }

  render() {
    return (
      <NavigationProvider router={router}>
        <StackNavigation initialRoute={router.getRoute('home')} />
      </NavigationProvider>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch })

export default connect(
  undefined,
  mapDispatchToProps,
)(Root)

Expo.registerRootComponent(Root)
