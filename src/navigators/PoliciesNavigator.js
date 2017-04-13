import { StackNavigator } from 'react-navigation'

import PoliciesScreen from 'jog/src/screens/PoliciesScreen'
import AddPolicyScreen from 'jog/src/screens/AddPolicyScreen'

import PolicyDetailsTabNavigator from './PolicyDetailsTabNavigator'

const PoliciesStackNavigator = StackNavigator({
  Policies: { screen: PoliciesScreen },
  PolicyDetails: { screen: PolicyDetailsTabNavigator },
  AddPolicy: { screen: AddPolicyScreen }
}, {
  initialRouteName: 'Policies',
  headerMode: 'none',
})

PoliciesStackNavigator.navigationOptions = {
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  },
}

export default PoliciesStackNavigator
