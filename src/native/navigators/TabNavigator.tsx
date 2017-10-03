import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { BLUE, DARK_GRAY, PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import AuthButton from '~/native/components/AuthButton'
import { Logo } from '~/native/components/images/index'
import SettingsScreen from '~/native/screens/SettingsScreen'

import PoliciesNavigator from './PoliciesNavigator'

const styles = StyleSheet.create({
  headerLogo: {
    marginLeft: MARGIN.large,
    marginTop: MARGIN.base,
    position: 'relative',
    bottom: 4,
  },
  headerAuthButton: {
    marginRight: MARGIN.large,
  },
  tabBar: {
    backgroundColor: BLUE,
    ...Platform.select({
      android: {
        height: 50,
      },
      ios: {
        height: 30,
      },
    }),
  },
  tabBarLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Bold',
  },
})

const tabNavigator = TabNavigator(
  {
    Policies: { screen: PoliciesNavigator },
    Settings: { screen: SettingsScreen },
  },
  {
    swipeEnabled: true,
    animationEnabled: false,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: styles.tabBar,
      labelStyle: styles.tabBarLabel,
      activeTintColor: PINK,
      inactiveTintColor: DARK_GRAY,
      // Android only (defaults to uppercase)
      upperCaseLabel: false,
      // This is the line at the bottom of the selected tab on android
      indicatorStyle: {
        height: 0,
      },
    },
  },
)

tabNavigator.navigationOptions = () => {
  return {
    title: null,
    headerTitle: '',
    headerLeft: <Logo style={styles.headerLogo} scale={1} />,
    headerRight: <AuthButton style={styles.headerAuthButton} />,
    headerStyle: { backgroundColor: BLUE },
  }
}

export default tabNavigator
