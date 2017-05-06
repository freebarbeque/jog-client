import React from 'react'
import { StackNavigator } from 'react-navigation'

import InsurerScreen from 'jog/src/screens/manualAddPolicy/InsurerScreen'

import { Logo } from '../components/images/index'
import { MARGIN } from '../constants/style'
import { BLUE } from '../constants/palette'

const AddPolicyNavigator = StackNavigator({
  Insurer: { screen: InsurerScreen },
}, {
  initialRouteName: 'Insurer',
  headerMode: 'none',
})

AddPolicyNavigator.navigationOptions = () => {
  const opts = {
    cardStack: {
      // Should not be able to pull down to dismiss the modal.
      gesturesEnabled: false
    },
    headerTitle: null,
    headerLeft: (
      <Logo
        style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
        scale={1}
      />
    ),
    headerStyle: { backgroundColor: BLUE }
  }

  return opts
}

export default AddPolicyNavigator
