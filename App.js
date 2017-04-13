// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, BackAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Provider } from 'react-redux'
import createStore from './src/store/index'
import initialiseFirebase from './src/data'
import { BLUE } from './src/constants/palette'
import RootNavigator from './src/navigators/RootNavigator'
import { syncData } from './src/store/actions'
import type { Route } from './src/types'

initialiseFirebase()

const store = createStore()

function sumRoutes(routes: Route[]) {
  return routes.length + _.sum(routes.map((r) => sumRoutes(r.routes || [])))
}

export default class JogApp extends Component {
  componentDidMount() {
    store.dispatch(syncData())

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const nav = store.getState().nav
      const routes = nav.routes

      const numRoutes = sumRoutes(routes)
      console.log('numRoutes', numRoutes)
      if (numRoutes > 1) {
        store.dispatch(NavigationActions.back())
        return true // Override default behaviour
      }
      return false // Default behavior e.g. it will exit the app as normal
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
