import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'

import SettingsScreen from 'jog/src/screens/SettingsScreen'
import MarketsScreen from 'jog/src/screens/MarketsScreen'
import { BLUE, DARK_GRAY, PINK } from 'jog/src/constants/palette'
import { Logo } from 'jog/src/components/images/index'
import AuthButton from 'jog/src/components/AuthButton'
import { MARGIN } from 'jog/src/constants/style'

import PoliciesNavigator from './PoliciesNavigator'

const styles = StyleSheet.create({
  headerLogo: {
    marginLeft: MARGIN.large,
    position: 'relative',
    bottom: 4
  },
  headerAuthButton: {
    marginRight: MARGIN.large
  },
  tabBar: {
    backgroundColor: BLUE,
    ...Platform.select({
      android: {
        height: 50,
      },
      ios: {
        height: 30
      }
    })
  },
  tabBarLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Bold'
  }
})

const tabNavigator = TabNavigator({
  Policies: { screen: PoliciesNavigator },
  Markets: { screen: MarketsScreen },
  Settings: { screen: SettingsScreen },
}, {
  swipeEnabled: true,
  animationEnabled: false,
  tabBarPosition: 'top',
  tabBarOptions: {
    order: [
      'Policies',
      'Markets',
      'Settings'
    ],
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: PINK,
    inactiveTintColor: DARK_GRAY,
    // Android only (defaults to uppercase)
    upperCaseLabel: false,
    // This is the line at the bottom of the selected tab on android
    indicatorStyle: {
      height: 0,
    }
  }
})

tabNavigator.navigationOptions = () => {
  return {
    title: null,
    headerTitle: '',
    headerLeft: <Logo style={styles.headerLogo} scale={1} />,
    headerRight: <AuthButton style={styles.headerAuthButton} />,
    headerStyle: { backgroundColor: BLUE }
  }
}

export default tabNavigator
