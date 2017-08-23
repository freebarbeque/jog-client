import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import { IReduxState } from '../../common/types'
import AccessoryInput from '../components/AccessoryInput'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class PolicyCostScreen extends React.Component<IProps> {
  public render() {
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

  private handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/vehicleRegistration'))
  }

  private handleChange = e => {
    this.props.dispatch(updateManualPolicy({ cost: e.target.value }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyCostScreen)
