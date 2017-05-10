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
import RadioInput from '../../components/RadioInput'
import { MARGIN } from '../../constants/style'

type VehicleOwnershipScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class VehicleOwnershipScreen extends Component {
  props: VehicleOwnershipScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Finished' }))
  }

  handleChange = (ownership) => {
    this.props.dispatch(updateManualPolicy({ ownership }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="Is your vehicle:"
        onNextPress={this.handleNextPress}
        onPrevPress={() => this.props.dispatch(NavigationActions.back())}
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
