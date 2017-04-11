// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'

import { Provider } from 'react-redux'
import createStore from './src/store/index'
import initialiseFirebase from './src/data'
import { userSubscribe } from './src/data/auth'
import { receiveUser } from './src/store/auth/actions'
import { BLUE } from './src/constants/palette'
import RootNavigator from './src/navigators/RootNavigator'

initialiseFirebase()

const store = createStore()

export default class JogApp extends Component {
  componentDidMount() {
    // Sync authorisation state
    const previousUser = null

    userSubscribe((newUser) => {
      const newUserId = newUser && newUser.uid
      const priorUserId = previousUser && previousUser.uid

      if (newUserId !== priorUserId) {
        if (priorUserId) {
          store.dispatch({ type: 'UNSYNC_USER_DATA', uid: priorUserId })
        }
        if (newUserId) {
          store.dispatch({ type: 'SYNC_USER_DATA', uid: newUserId })
        }
      }

      store.dispatch(receiveUser(newUser))
    })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
          />
          <RootNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE
  }
})
