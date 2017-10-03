/* @flow */

import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import * as _ from 'lodash'
import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '~/common/store/screens/addManualPolicy/actions'
import { Dispatch, Insurer, InsurerMap, IReduxState } from '~/common/types'
import AddPolicyScreenContainer from '~/native/components/AddPolicyScreenContainer'
import Picker from '~/native/components/Picker'

interface IInsurerScreenProps {
  dispatch: Dispatch
  insurers: InsurerMap
  policy: IManualPolicyUpdate
}

class InsurerScreen extends React.Component<IInsurerScreenProps> {
  public handleNextPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'PolicyNumber' }),
    )
  }

  public onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

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
        <Picker
          onChange={this.onChange}
          value={
            company && companyId && company.name
              ? { value: companyId, label: company.name }
              : null
          }
          placeholder="Insurer"
          options={options}
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: IReduxState) => ({
  insurers: state.insurers.insurers,
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(InsurerScreen)
