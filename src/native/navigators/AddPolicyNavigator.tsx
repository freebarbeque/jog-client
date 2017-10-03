import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import FinishedScreen from '../screens/manualAddPolicy/FinishedScreen'
import InsurerScreen from '../screens/manualAddPolicy/InsurerScreen'
import LicensePlateScreen from '../screens/manualAddPolicy/LicensePlateScreen'
import PolicyCostScreen from '../screens/manualAddPolicy/PolicyCostScreen'
import PolicyDateScreen from '../screens/manualAddPolicy/PolicyDateScreen'
import PolicyNumberScreen from '../screens/manualAddPolicy/PolicyNumberScreen'
import VehicleOwnershipScreen from '../screens/manualAddPolicy/VehicleOwnershipScreen'

import { Cancel, Logo } from '../components/images'

const AddPolicyNavigator = StackNavigator(
  {
    Insurer: { screen: InsurerScreen },
    PolicyNumber: { screen: PolicyNumberScreen },
    PolicyDate: { screen: PolicyDateScreen },
    PolicyCost: { screen: PolicyCostScreen },
    LicensePlate: { screen: LicensePlateScreen },
    Cost: { screen: PolicyCostScreen },
    VehicleOwnership: { screen: VehicleOwnershipScreen },
    Finished: { screen: FinishedScreen },
  },
  {
    initialRouteName: 'Insurer',
    headerMode: 'none',
  },
)

AddPolicyNavigator.navigationOptions = navigation => {
  const opts = {
    cardStack: {
      // Should not be able to pull down to dismiss the modal.
      gesturesEnabled: false,
    },
    headerTitle: null,
    headerLeft: (
      <Logo
        style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
        scale={1}
      />
    ),
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: MARGIN.large, marginTop: MARGIN.base }}
        onPress={() => navigation.navigation.goBack()}
      >
        <Cancel />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: BLUE },
  }

  return opts
}

export default AddPolicyNavigator
