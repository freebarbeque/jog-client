
import { StackNavigator } from 'react-navigation'

import PoliciesScreen from 'jog/src/screens/PoliciesScreen'
import GetStartedScreen from 'jog/src/screens/GetStartedScreen'

const policiesNavigator = StackNavigator({
  Policies: { screen: PoliciesScreen },
  GetStarted: { screen: GetStartedScreen }
}, {
  initialRouteName: 'GetStarted',
  headerMode: 'none',
})

policiesNavigator.navigationOptions = {
  cardStack: {
    // Should not be able to pull down to dismiss the auth modal.
    gesturesEnabled: false
  },
}

export default policiesNavigator
