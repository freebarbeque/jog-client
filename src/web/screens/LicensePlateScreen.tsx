import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import { Action, IReduxState } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Input from '../components/Input'

interface IProps extends DispatchProp<Action> {
  policy: IManualPolicyUpdate
}

class LicensePlateScreen extends React.Component<IProps> {
  public render() {
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

  private handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/ownership'))
  }

  private handleChange = e => {
    const text = e.target.value
    this.props.dispatch(updateManualPolicy({ vehicleRegistration: text }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(LicensePlateScreen)
