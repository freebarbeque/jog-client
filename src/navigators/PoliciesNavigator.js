import { StackNavigator } from 'react-navigation'

import PoliciesScreen from 'jog/src/screens/PoliciesScreen'
import GetStartedScreen from 'jog/src/screens/GetStartedScreen'
import PolicyDetailsTabNavigator from './PolicyDetailsTabNavigator'

const PoliciesStackNavigator = StackNavigator({
  Policies: { screen: PoliciesScreen },
  GetStarted: { screen: GetStartedScreen },
  PolicyDetails: { screen: PolicyDetailsTabNavigator },
}, {
  initialRouteName: 'GetStarted',
  headerMode: 'none',
})

PoliciesStackNavigator.navigationOptions = {
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  },
}

export default PoliciesStackNavigator
