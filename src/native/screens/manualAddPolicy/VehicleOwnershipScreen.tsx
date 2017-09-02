import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IReduxState } from '~/common/types'

import { MARGIN } from '~/common/constants/style'

import {
  IManualPolicyUpdate,
  motorPolicyOwnership,
  savePolicy,
  updateManualPolicy,
} from '~/common/store/screens/addManualPolicy/actions'

import AddPolicyScreenContainer from '~/native/components/AddPolicyScreenContainer'
import RadioInput from '~/native/components/RadioInput'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class VehicleOwnershipScreen extends React.Component<IProps> {
  public render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="Is your vehicle:"
        onNextPress={this.handleNextPress}
        onPrevPress={() => {
          this.props.dispatch(NavigationActions.back())
        }}
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

  private handleNextPress = () => {
    const policy = this.props.policy
    this.props.dispatch(savePolicy(policy))
  }

  private handleChange = ownership => {
    this.props.dispatch(
      updateManualPolicy({ ownership: motorPolicyOwnership[ownership] }),
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(VehicleOwnershipScreen)
