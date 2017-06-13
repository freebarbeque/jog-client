/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import type { Dispatch, ReduxState } from '../../common/types'
import {
  ManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Input from '../components/Input'

type LicensePlateScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class LicensePlateScreen extends Component {
  props: LicensePlateScreenProps

  handleNextPress = () => {
    this.props.dispatch(push('/app/policies/manual/ownership'))
  }

  handleChange = e => {
    const text = e.target.value
    this.props.dispatch(updateManualPolicy({ vehicleRegistration: text }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title="What is your license plate No."
        onNextPress={this.handleNextPress}
        disableNextButton={!this.props.policy.vehicleRegistration}
      >
        <Input
          onChange={this.handleChange}
          value={this.props.policy.vehicleRegistration}
          name="policyNo"
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(LicensePlateScreen)
