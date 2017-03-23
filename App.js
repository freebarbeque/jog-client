// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
// import { Font } from 'expo'

import Root from './src/containers/Root'
import createStore from './src/redux/createStore'
import initialiseFirebase from './src/data'

initialiseFirebase()

type AppState = {
  fontsLoaded: boolean,
}

export default class App extends React.Component {
  state: AppState = {
    fontsLoaded: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={createStore({ logger: true })}>
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
