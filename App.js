// @flow

import React, { Component } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'

import Root from './src/containers/Root'
import createStore from './src/redux/createStore'
import initialiseFirebase from './src/data'

initialiseFirebase()

type AppState = {
  fontsLoaded: boolean,
}

const store = createStore({ logger: true })

export default class App extends Component {
  state: AppState = {
    fontsLoaded: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Provider store={store}>
          <Root />
        </Provider>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
