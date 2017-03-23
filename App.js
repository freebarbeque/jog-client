// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'

import Root from './src/containers/Root'
import createStore from './src/redux/createStore'
import initialiseFirebase from './src/data'

initialiseFirebase()
const store = createStore({ logger: true })

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
