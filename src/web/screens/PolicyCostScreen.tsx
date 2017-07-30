import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Dispatch, ReduxState } from '../../common/types'
import { updateManualPolicy } from '../../common/store/screens/addManualPolicy/actions'
import { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import AccessoryInput from '../components/AccessoryInput'

type PolicyCostScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class PolicyCostScreen extends React.Component<PolicyCostScreenProps> {
  handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/vehicleRegistration'))
  }

  handleChange = e => {
    this.props.dispatch(updateManualPolicy({ cost: e.target.value }))
  }

  render() {
    const cost = this.props.policy.cost
    const disabled = cost === undefined || cost === null

    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title={'How much does your policy cost per year?'}
        onNextPress={this.handleNextPress}
        disableNextButton={disabled}
      >
        <AccessoryInput
          accessory="£"
          type="number"
          onChange={this.handleChange}
          value={cost}
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyCostScreen)
