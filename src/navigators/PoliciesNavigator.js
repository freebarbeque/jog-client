
import { StackNavigator } from 'react-navigation'

import PoliciesScreen from 'jog/src/screens/PoliciesScreen'

const policiesNavigator = StackNavigator({
  Policies: { screen: PoliciesScreen },
}, {
  initialRouteName: 'Policies',
  headerMode: 'none',
})

policiesNavigator.navigationOptions = {
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  },
}

export default policiesNavigator
