import { TabNavigator } from 'react-navigation'
import { StyleSheet } from 'react-native'

import PolicyDetailsScreen from 'jog/src/screens/PolicyDetailsScreen'
import PolicyDocumentsScreen from 'jog/src/screens/PolicyDocumentsScreen'
import { BLUE, PINK, WHITE } from '../constants/palette'

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: WHITE,
    height: 53,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'WorkSans-Bold',
  },
  tab: {
  }
})

const PolicyDetailsTabNavigator = TabNavigator({
  Details: { screen: PolicyDetailsScreen },
  Documents: { screen: PolicyDocumentsScreen },
}, {
  initialRouteName: 'Details',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'top',
  upperCaseLabel: false,

  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    showIcon: false,
    activeTintColor: BLUE,
    inactiveTintColor: 'rgb(126,130,142)',
    indicatorStyle: {
      height: 5,
      backgroundColor: PINK
    },
    // Android only (defaults to uppercase)
    upperCaseLabel: false,
    tabStyle: styles.tab
  }
})

PolicyDetailsTabNavigator.navigationOptions = {
  title: null,
  header: {
    visible: false
  }
}

export default PolicyDetailsTabNavigator
