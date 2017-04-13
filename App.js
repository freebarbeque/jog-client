// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'

import { Provider } from 'react-redux'
import createStore from './src/store/index'
import initialiseFirebase from './src/data'
import { BLUE } from './src/constants/palette'
import RootNavigator from './src/navigators/RootNavigator'
import { syncData } from './src/store/actions'

initialiseFirebase()

const store = createStore()

export default class JogApp extends Component {
  componentDidMount() {
    store.dispatch(syncData())
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
