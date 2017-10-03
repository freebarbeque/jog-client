/* @flow */

import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IReduxState } from '~/common/types'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '~/common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '~/native/components/AddPolicyScreenContainer'
import TextInput from '~/native/components/TextInput'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class PolicyNumberScreen extends React.Component<IProps> {
  public render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="What's your policy number?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => {
          this.props.dispatch(NavigationActions.back())
        }}
        disableNextButton={!this.props.policy.policyNo}
      >
        <TextInput
          value={this.props.policy.policyNo}
          onChangeText={text =>
            this.props.dispatch(updateManualPolicy({ policyNo: text }))}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderRadius: 8, overflow: 'hidden' }}
          editable
        />
      </AddPolicyScreenContainer>
    )
  }

  private handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PolicyDate' }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyNumberScreen)
