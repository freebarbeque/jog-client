/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  Dispatch,
  ReduxState,
} from 'jog/src/types'

import AddPolicyScreenContainer from 'jog/src/components/AddPolicyScreenContainer'
import type { ManualPolicyUpdate } from 'jog/src/store/screens/addManualPolicy/actions'
import { updateManualPolicy, savePolicy, motorPolicyOwnership } from 'jog/src/store/screens/addManualPolicy/actions'
import RadioInput from 'jog/src/components/RadioInput'
import { MARGIN } from 'jog/src/constants/style'

type VehicleOwnershipScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class VehicleOwnershipScreen extends Component {
  props: VehicleOwnershipScreenProps

  handleNextPress = () => {
    const policy = this.props.policy
    this.props.dispatch(savePolicy(policy))
  }

  handleChange = (ownership) => {
    this.props.dispatch(updateManualPolicy({ ownership: motorPolicyOwnership[ownership] }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="Is your vehicle:"
        onNextPress={this.handleNextPress}
        onPrevPress={() => { this.props.dispatch(NavigationActions.back()) }}
        disableNextButton={!this.props.policy.ownership}
      >
        <RadioInput
          style={{ marginTop: MARGIN.base }}
          options={[
            { value: 'owned', label: 'Owned' },
            { value: 'leased', label: 'Leased' },
            { value: 'financed', label: 'Financed' },
          ]}
          value={this.props.policy.ownership}
          onChange={this.handleChange}
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
)(VehicleOwnershipScreen)
