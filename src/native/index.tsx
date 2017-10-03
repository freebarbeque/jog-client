import 'jog/globals'
import * as React from 'react'
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Provider } from 'react-redux'

import { BLUE } from '~/common/constants/palette'
import initialiseFirebase from '~/common/data/index'
import { syncData } from '~/common/store/actions'
import createStore from '~/common/store/index'
import ActionModal from '~/native/components/ActionModal'
import EnablePushNotificationsModal from '~/native/components/EnablePushNotificationsModal'
import RootNavigator from '~/native/navigators/RootNavigator'
import { NativeNavigationAdapter } from './NativeNavigationAdapter'
import reducer from './store/reducer'

import {
  pushNotificationSaga,
  pushNotificationSubscriptionSaga,
} from './store/push/sagas'

import config from './config'
import { initFirestack } from './data/index'
import NativeUploadAdapter from './NativeUploadAdapter'

initialiseFirebase(config)
initFirestack()

const isDebug = config.isDebug

const store = createStore({
  freeze: isDebug,
  enableDevTools: isDebug,
  reducer,
  sagas: [pushNotificationSaga, pushNotificationSubscriptionSaga],
  navigationAdaptor: NativeNavigationAdapter,
  uploadAdaptor: NativeUploadAdapter,
  middleware: [],
}) as any
;(console as any).ignoredYellowBox = [
  'Remote debugger is in a background tab',
  'Setting a timer for a long period',
]

export default class JogApp extends React.Component {
  public componentDidMount() {
    store.dispatch(syncData())

    BackHandler.addEventListener('hardwareBackPress', () => {
      store.dispatch(NavigationActions.back())
      return true
    })
  }

  public render() {
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
