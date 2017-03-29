import React from 'react'
import { TabNavigator } from 'react-navigation'
import SettingsScreen from '../screens/SettingsScreen'
import PoliciesScreen from '../screens/PoliciesScreen'
import MarketsScreen from '../screens/MarketsScreen'
import { BLUE, DARK_GRAY, PINK } from '../constants/palette'
import { Logo } from '../components/images/index'
import AuthButton from '../components/AuthButton'

const tabNavigator = TabNavigator({
  Policies: { screen: PoliciesScreen },
  Markets: { screen: MarketsScreen },
  Settings: { screen: SettingsScreen },
}, {
  initialRouteName: 'Policies',
  swipeEnabled: true,
  animationEnabled: false,
  tabBarPosition: 'top',
  tabBarOptions: {
    order: [
      'Policies',
      'Markets',
      'Settings'
    ],
    style: {
      backgroundColor: BLUE,
      height: 30
    },
    labelStyle: {
      marginBottom: 6,
      fontSize: 12,
      fontWeight: 'bold',
    },
    activeTintColor: PINK,
    inactiveTintColor: DARK_GRAY
  }
})

tabNavigator.navigationOptions = {
  title: null,
  // eslint-disable-next-line no-unused-vars
  header: ({ state, setParams }) => {
    return {
      title: '',
      left: <Logo style={{ marginLeft: 10, marginTop: 3 }} scale={0.2} />,
      right: <AuthButton style={{ marginTop: 10, marginRight: 10 }} />,
      style: { backgroundColor: BLUE }
    }
  }
}

export default tabNavigator

