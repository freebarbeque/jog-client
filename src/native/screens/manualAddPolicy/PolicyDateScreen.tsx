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
import DatePicker from '~/native/components/DatePicker'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class PolicyDateScreen extends React.Component<IProps> {
  public render() {
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

  private handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Cost' }))
  }

  private onChange = expiryDate => {
    this.props.dispatch(updateManualPolicy({ expiryDate }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyDateScreen)
