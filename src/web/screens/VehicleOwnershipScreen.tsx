import * as React from 'react'
import { connect } from 'react-redux'

import { MARGIN } from '../../common/constants/style'
import {
  motorPolicyOwnership,
  savePolicy,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import { Dispatch, ReduxState } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import RadioInput from '../components/RadioInput'

interface VehicleOwnershipScreenProps {
  dispatch: Dispatch
  policy: ManualPolicyUpdate
}

class VehicleOwnershipScreen extends React.Component<
  VehicleOwnershipScreenProps
> {
  handleNextPress = () => {
    const policy = this.props.policy
    this.props.dispatch(savePolicy(policy))
  }

  handleChange = ownership => {
    this.props.dispatch(
      updateManualPolicy({ ownership: motorPolicyOwnership[ownership] }),
    )
  }

  render() {
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
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(VehicleOwnershipScreen)
