import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import { IReduxState } from '../../common/types'

import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Input from '../components/Input'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class PolicyNumberScreen extends React.Component<IProps> {
  public render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title={"What's your policy number?"}
        onNextPress={this.handleNextPress}
        disableNextButton={!this.props.policy.policyNo}
      >
        <Input
          onChange={this.handleChange}
          value={this.props.policy.policyNo}
          name="policyNo"
        />
      </AddPolicyScreenContainer>
    )
  }

  private handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/expiryDate'))
  }

  private handleChange = e => {
    const text = e.target.value
    this.props.dispatch(updateManualPolicy({ policyNo: text }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyNumberScreen)
