import { StackNavigator } from 'react-navigation'
import TabNavigator from './TabNavigator'

const RootNavigator = StackNavigator({
  Tabs: { screen: TabNavigator },
}, {
  initialRouteName: 'Tabs'
})

export default RootNavigator
