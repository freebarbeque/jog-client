import { RootStackNavigator } from '~/native/navigators/RootNavigator'

export default (state, action) => {
  const newState = RootStackNavigator.router.getStateForAction(action, state)
  return newState || state
}
