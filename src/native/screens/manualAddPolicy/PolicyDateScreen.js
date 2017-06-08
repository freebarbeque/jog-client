/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { Dispatch, ReduxState } from 'jog/src/common/types'

import AddPolicyScreenContainer from 'jog/src/native/components/AddPolicyScreenContainer'
import type { ManualPolicyUpdate } from 'jog/src/common/store/screens/addManualPolicy/actions'
import { updateManualPolicy } from 'jog/src/common/store/screens/addManualPolicy/actions'
import DatePicker from 'jog/src/native/components/DatePicker'

type PolicyDateScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class PolicyDateScreen extends Component {
  props: PolicyDateScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Cost' }))
  }

  onChange = expiryDate => {
    this.props.dispatch(updateManualPolicy({ expiryDate }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="What date does the policy expire?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => {
          this.props.dispatch(NavigationActions.back())
        }}
        disableNextButton={!this.props.policy.expiryDate}
      >
        <DatePicker
          date={this.props.policy.expiryDate}
          onDateChange={this.onChange}
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyDateScreen)
