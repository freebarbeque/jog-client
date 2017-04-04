// @flow
import 'jog/globals'
import React, { Component } from 'react'
import { Font } from 'expo'
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
  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    Font.loadAsync({
      FontAwesome: require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'WorkSans-Black': require('./assets/fonts/WorkSans-Black.ttf'),
      'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
      'WorkSans-ExtraBold': require('./assets/fonts/WorkSans-ExtraBold.ttf'),
      'WorkSans-ExtraLight': require('./assets/fonts/WorkSans-ExtraLight.ttf'),
      'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
      'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
      'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
      'WorkSans-SemiBold': require('./assets/fonts/WorkSans-SemiBold.ttf'),
      'WorkSans-Thin': require('./assets/fonts/WorkSans-Thin.ttf'),
    }).then(() => {
      console.log('loaded fonts')
      this.setState({ fontLoaded: true })
    }).catch((err) => {
      console.error('Error loading fonts', err)
    })

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
            backgroundColor={BLUE}
          />
          {this.state.fontLoaded ? <AppWithRootNavigationState /> : null}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      }
    })
  }
})
