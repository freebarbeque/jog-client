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

type PolicyCostScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class PolicyCostScreen extends Component {
  props: PolicyCostScreenProps

  componentWillUnmount() {
    this.props.dispatch(clearManualPolicy())
  }

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'LicensePlate' }))
  }

  onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="How much does your policy cost per year?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => this.props.dispatch(NavigationActions.back())}
      />
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy
})

export default connect(
  mapStateToProps,
)(PolicyCostScreen)
