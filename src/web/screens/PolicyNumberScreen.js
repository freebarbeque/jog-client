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

type PolicyNumberScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class PolicyNumberScreen extends Component {
  props: PolicyNumberScreenProps

  handleNextPress = () => {
    this.props.dispatch(push('/app/policies/manual/expiryDate'))
  }

  handleChange = e => {
    const text = e.target.value
    this.props.dispatch(updateManualPolicy({ policyNo: text }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title={"What's your policy number?"}
        onNextPress={this.handleNextPress}
        disableNextButton={!this.props.policy.policyNo}
      >
        <Input
          onChange={this.handleChange}
          value={this.props.policy.policyNo}
          name="policyNo"
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyNumberScreen)
