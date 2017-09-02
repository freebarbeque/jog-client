import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IReduxState } from '~/common/types'

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '~/common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '~/native/components/AddPolicyScreenContainer'
import TextInput from '~/native/components/TextInput'

interface ILicensePlateScreenProps extends DispatchProp<any> {
  policy: IManualPolicyUpdate
}

class LicensePlateScreen extends React.Component<ILicensePlateScreenProps> {
  public handleNextPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'VehicleOwnership' }),
    )
  }

  public render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton
        title="What is your license plate no."
        onNextPress={this.handleNextPress}
        onPrevPress={() => {
          this.props.dispatch(NavigationActions.back())
        }}
        disableNextButton={!this.props.policy.vehicleRegistration}
      >
        <TextInput
          value={this.props.policy.vehicleRegistration}
          onChangeText={text =>
            this.props.dispatch(
              updateManualPolicy({ vehicleRegistration: text }),
            )}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderRadius: 8, overflow: 'hidden' }}
          editable
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(LicensePlateScreen)
