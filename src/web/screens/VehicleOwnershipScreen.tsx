import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { MARGIN } from '../../common/constants/style'
import {
  motorPolicyOwnership,
  savePolicy,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import {
  IManualPolicyUpdate,
  MotorPolicyOwnership,
} from '../../common/store/screens/addManualPolicy/actions'
import { IReduxState } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import RadioInput from '../components/RadioInput'

interface IVehicleOwnershipScreenProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class VehicleOwnershipScreen extends React.Component<
  IVehicleOwnershipScreenProps
> {
  public render() {
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
