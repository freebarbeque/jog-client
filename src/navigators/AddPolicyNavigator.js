import React from 'react'
import { StackNavigator } from 'react-navigation'
import {TouchableOpacity} from 'react-native'

import InsurerScreen from 'jog/src/screens/manualAddPolicy/InsurerScreen'
import PolicyNumberScreen from '../screens/manualAddPolicy/PolicyNumberScreen'
import PolicyDateScreen from '../screens/manualAddPolicy/PolicyDateScreen'
import PolicyCostScreen from '../screens/manualAddPolicy/PolicyCostScreen'
import LicensePlateScreen from '../screens/manualAddPolicy/LicensePlateScreen'
import VehicleOwnershipScreen
  from '../screens/manualAddPolicy/VehicleOwnershipScreen'
import FinishedScreen from '../screens/manualAddPolicy/FinishedScreen'

import {Cancel, Logo} from '../components/images/index'
import { MARGIN } from '../constants/style'
import { BLUE } from '../constants/palette'

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

AddPolicyNavigator.navigationOptions = (navigation) => {
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
