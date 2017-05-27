// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, BackHandler, AppState } from 'react-native'
import { NavigationActions } from 'react-navigation'
import FCM from 'react-native-fcm'

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
console.ignoredYellowBox = [
  'Remote debugger is in a background tab',
  'Setting a timer for a long period'
]

export default class JogApp extends Component {
  componentDidMount() {
    store.dispatch(syncData())

    BackHandler.addEventListener('hardwareBackPress', () => {
      store.dispatch(NavigationActions.back())
      return true
    })

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log('unmounting')
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!')
      FCM.getInitialNotification().then((notif) => {
        console.log('Foreground notif', notif)
      })
    }
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
