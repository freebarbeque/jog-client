import React from 'react'
import { TabNavigator } from 'react-navigation'

import SettingsScreen from 'jog/src/screens/SettingsScreen'
import PoliciesScreen from 'jog/src/screens/PoliciesScreen'
import MarketsScreen from 'jog/src/screens/MarketsScreen'
import { BLUE, DARK_GRAY, PINK } from 'jog/src/constants/palette'
import { Logo } from 'jog/src/components/images/index'
import AuthButton from 'jog/src/components/AuthButton'
import { MARGIN } from 'jog/src/constants/style'

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
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'WorkSans-Bold'
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
      left: <Logo style={{ marginLeft: MARGIN.large, position: 'relative', bottom: 4 }} scale={1} />,
      right: <AuthButton style={{ marginRight: MARGIN.large }} />,
      style: { backgroundColor: BLUE }
    }
  }
}

export default tabNavigator
