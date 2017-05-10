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
import TextInput from '../../components/TextInput'

type PolicyNumberScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class PolicyNumberScreen extends Component {
  props: PolicyNumberScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PolicyDate' }))
  }

  onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="What's your policy number?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => { this.props.dispatch(NavigationActions.back()) }}
        disableNextButton={!this.props.policy.policyNo}
      >
        <TextInput
          value={this.props.policy.policyNo}
          onChangeText={(text) => this.props.dispatch(updateManualPolicy({ policyNo: text }))}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderRadius: 8, overflow: 'hidden' }}
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
)(PolicyNumberScreen)
