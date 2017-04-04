import { StackNavigator } from 'react-navigation'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'

const RootNavigator = StackNavigator({
  Tabs: { screen: TabNavigator },
  Auth: { screen: AuthNavigator },
}, {
  initialRouteName: 'Tabs',
  mode: 'modal',
  headerMode: 'screen',
})

export default RootNavigator
