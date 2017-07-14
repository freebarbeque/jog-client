/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { Dispatch, ReduxState } from '../../common/types'
import {
  motorPolicyOwnership,
  savePolicy,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import type { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import RadioInput from '../components/RadioInput'
import { MARGIN } from '../../common/constants/style'

type VehicleOwnershipScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class VehicleOwnershipScreen extends Component {
  props: VehicleOwnershipScreenProps

  handleNextPress = () => {
    const policy = this.props.policy
    this.props.dispatch(savePolicy(policy))
  }

  handleChange = ownership => {
    this.props.dispatch(
      updateManualPolicy({ ownership: motorPolicyOwnership[ownership] }),
    )
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title="Is your vehicle:"
        onNextPress={this.handleNextPress}
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
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(VehicleOwnershipScreen)
