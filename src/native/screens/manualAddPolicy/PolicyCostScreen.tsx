import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IReduxState } from '~/common/types'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '~/common/store/screens/addManualPolicy/actions'
import AccessoryTextInput from '~/native/components/AccessoryTextInput'
import AddPolicyScreenContainer from '~/native/components/AddPolicyScreenContainer'

interface IProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class PolicyCostScreen extends React.Component<IProps> {
  public render() {
    const cost = this.props.policy.cost || ''

    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="How much does your policy cost per year?"
        onNextPress={this.handleNextPress}
        onPrevPress={() => {
          this.props.dispatch(NavigationActions.back())
        }}
        disableNextButton={!this.props.policy.cost}
      >
        <AccessoryTextInput
          value={cost}
          onChangeText={text =>
            this.props.dispatch(updateManualPolicy({ cost: text }))}
          editable
          accessory="£"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
        />
      </AddPolicyScreenContainer>
    )
  }

  private handleNextPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'LicensePlate' }),
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyCostScreen)
