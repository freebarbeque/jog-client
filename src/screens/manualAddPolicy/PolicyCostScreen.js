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
import { updateManualPolicy } from '../../store/screens/addManualPolicy/actions'
import AccessoryTextInput from '../../components/AccessoryTextInput'

type PolicyCostScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class PolicyCostScreen extends Component {
  props: PolicyCostScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'LicensePlate' }))
  }

  render() {
    const cost = this.props.policy.cost || ''

    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="How much does your policy cost per year?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => { this.props.dispatch(NavigationActions.back()) }}
        disableNextButton={!this.props.policy.cost}
      >
        <AccessoryTextInput
          value={cost}
          onChangeText={(text) => this.props.dispatch(updateManualPolicy({ cost: text }))}
          editable
          accessory="£"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
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
)(PolicyCostScreen)
