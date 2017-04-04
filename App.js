// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, Platform, StyleSheet } from 'react-native'

import { addNavigationHelpers } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import RootNavigator from './src/navigators/RootNavigator'
import createStore from './src/redux/createStore'
import type { ReduxState } from './src/types'
import initialiseFirebase from './src/data'
import { userSubscribe } from './src/data/auth'
import { receiveUser } from './src/redux/auth/actions'
import { BLUE } from './src/constants/palette'

const AppWithRootNavigationState = connect((state: ReduxState) => ({
  nav: state.nav,
}))(({ dispatch, nav }) => {
  console.log('nav', nav)
  return (
    <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  )
})

initialiseFirebase()

const store = createStore()

export default class JogApp extends Component {
  componentDidMount() {

    // Sync authorisation state
    userSubscribe((user) => {
      store.dispatch(receiveUser(user))
    })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
          />
          <AppWithRootNavigationState />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
