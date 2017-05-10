/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  Dispatch,
  ReduxState,
  InsurerMap,
  Insurer
} from 'jog/src/types'

import AddPolicyScreenContainer from '../../components/AddPolicyScreenContainer'
import Picker from '../../components/Picker'
import type { ManualPolicyUpdate } from '../../store/screens/addManualPolicy/actions'
import { updateManualPolicy, clearManualPolicy } from '../../store/screens/addManualPolicy/actions'

type InsurerScreenProps = {
  dispatch: Dispatch,
  insurers: InsurerMap,
  policy: ManualPolicyUpdate,
};

class InsurerScreen extends Component {
  props: InsurerScreenProps

  handleNextPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PolicyNumber' }))
  }

  onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

  render() {
    const options = [
      ..._.map(this.props.insurers, (insurer: Insurer, id: string) => {
        return ({
          label: insurer.name,
          value: id
        })
      }),
      {
        label: 'Other',
        value: 'other',
      }
    ]

    const companyId = this.props.policy.companyId
    let company

    if (companyId) {
      if (companyId === 'other') {
        company = { name: 'Other' }
      } else {
        company = this.props.insurers[companyId]
      }
    }

    console.log('company', company)

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
          value={company ? { value: companyId, label: company.name } : null}
          placeholder="Insurer"
          options={options}
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  insurers: state.insurers.insurers,
  policy: state.screens.addManualPolicy
})

export default connect(
  mapStateToProps,
)(InsurerScreen)
