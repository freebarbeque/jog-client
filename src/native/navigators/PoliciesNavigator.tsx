import { StackNavigator } from 'react-navigation'

import AddPolicyScreen from '~/native/screens/AddPolicyScreen'
import PoliciesScreen from '~/native/screens/PoliciesScreen'

import PolicyDetailsTabNavigator from './PolicyDetailsNavigator'

const PoliciesStackNavigator = StackNavigator(
  {
    Policies: { screen: PoliciesScreen },
    PolicyDetails: { screen: PolicyDetailsTabNavigator },
    AddPolicy: { screen: AddPolicyScreen },
  },
  {
    initialRouteName: 'Policies',
    headerMode: 'none',
  },
)

PoliciesStackNavigator.navigationOptions = () => ({
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false,
  },
})

export default PoliciesStackNavigator
