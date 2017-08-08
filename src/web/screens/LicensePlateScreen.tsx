import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import { updateManualPolicy } from '../../common/store/screens/addManualPolicy/actions'
import { Action, Dispatch, ReduxState } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Input from '../components/Input'

interface LicensePlateScreenProps extends DispatchProp<Action> {
  policy: ManualPolicyUpdate
}

class LicensePlateScreen extends React.Component<LicensePlateScreenProps> {
  handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/ownership'))
  }

  handleChange = e => {
    const text = e.target.value
    this.props.dispatch(updateManualPolicy({ vehicleRegistration: text }))
  }

  render() {
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
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(LicensePlateScreen)
