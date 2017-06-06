// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Provider } from 'react-redux'

import createStore from 'jog/src/common/store/index'
import initialiseFirebase from 'jog/src/common/data/index'
import { BLUE } from 'jog/src/common/constants/palette'
import RootNavigator from 'jog/src/native/navigators/RootNavigator'
import { syncData } from 'jog/src/common/store/actions'
import ActionModal from 'jog/src/native/components/ActionModal'
import EnablePushNotificationsModal from 'jog/src/native/components/EnablePushNotificationsModal'
import { NativeNavigationAdapter } from './NativeNavigationAdapter'

import config from './config'

initialiseFirebase()

const isDebug = config.isDebug

const store = createStore(NativeNavigationAdapter, {
  freeze: isDebug,
  enableDevTools: isDebug,
})

// $FlowFixMe
console.ignoredYellowBox = [
  'Remote debugger is in a background tab',
  'Setting a timer for a long period',
]

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
          <StatusBar barStyle="light-content" />
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
    backgroundColor: BLUE,
  },
})
