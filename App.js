// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Provider } from 'react-redux'
import createStore from './src/store/index'
import initialiseFirebase from './src/data'
import { BLUE } from './src/constants/palette'
import RootNavigator from './src/navigators/RootNavigator'
import { syncData } from './src/store/actions'
import ActionModal from './src/components/ActionModal'
import EnablePushNotificationsModal from './src/components/EnablePushNotificationsModal'

initialiseFirebase()

const store = createStore()

// $FlowFixMe
console.ignoredYellowBox = ['Remote debugger is in a background tab']

export default class JogApp extends Component {
  componentDidMount() {
    store.dispatch(syncData())

    BackHandler.addEventListener('hardwareBackPress', () => {
      store.dispatch(NavigationActions.back())
      return true
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
          <ActionModal />
          <EnablePushNotificationsModal />
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
