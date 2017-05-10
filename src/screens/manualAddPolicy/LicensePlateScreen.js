/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  Dispatch,
  ReduxState,
} from 'jog/src/types'

import AddPolicyScreenContainer from '../../components/AddPolicyScreenContainer'
import type { ManualPolicyUpdate } from '../../store/screens/addManualPolicy/actions'
import { updateManualPolicy, clearManualPolicy } from '../../store/screens/addManualPolicy/actions'
import TextInput from '../../components/TextInput'

type LicensePlateScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class LicensePlateScreen extends Component {
  props: LicensePlateScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'VehicleOwnership' }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="What is your license plate no."
        onNextPress={this.handleNextPress}
        onPrevPress={() => this.props.dispatch(NavigationActions.back())}
        disableNextButton={!this.props.policy.vehicleRegistration}
      >
        <TextInput
          value={this.props.policy.vehicleRegistration}
          onChangeText={(text) => this.props.dispatch(updateManualPolicy({ vehicleRegistration: text }))}
          autoCapitalize="none"
          autoCorrect={false}
          editable
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy
})

export default connect(
  mapStateToProps,
)(LicensePlateScreen)
