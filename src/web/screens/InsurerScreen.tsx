import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { updateManualPolicy } from '../../common/store/screens/addManualPolicy/actions'
import { IManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import {
  Action,
  Dispatch,
  Insurer,
  InsurerMap,
  IReduxState,
} from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Picker from '../components/Picker'

interface InsurerScreenProps extends DispatchProp<Action> {
  insurers: InsurerMap
  policy: IManualPolicyUpdate
}

class InsurerScreen extends React.Component<InsurerScreenProps> {
  public render() {
    const options = [
      ..._.map(this.props.insurers, (insurer: Insurer, id: string) => {
        return {
          label: insurer.name || '',
          value: id,
        }
      }),
      {
        label: 'Other',
        value: 'other',
      },
    ]

    const companyId = this.props.policy.companyId
    let company

    if (companyId) {
      company =
        companyId === 'other'
          ? { name: 'Other' }
          : this.props.insurers[companyId]
    }

    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title={'Who is your insurer?'}
        onNextPress={this.handleNextPress}
        disableNextButton={!company}
      >
        <div>
          <Picker
            className="picker"
            name="insurer"
            onChange={this.onChange}
            value={companyId}
            placeholder="Insurer"
            options={options}
          />
        </div>
      </AddPolicyScreenContainer>
    )
  }

  private handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/policyNo'))
  }

  private onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  insurers: state.insurers.insurers,
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(InsurerScreen)
