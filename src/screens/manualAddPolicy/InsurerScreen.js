/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import type {
  Dispatch,
  ReduxState,
  InsurerMap,
  Insurer
} from 'jog/src/types'

import AddPolicyScreenContainer from '../../components/AddPolicyScreenContainer'
import Picker from '../../components/Picker'
import type { clearManualPolicy, ManualPolicyUpdate } from '../../store/screens/addManualPolicy/actions'
import { updateManualPolicy } from '../../store/screens/addManualPolicy/actions'

type InsurerScreenProps = {
  dispatch: Dispatch,
  insurers: InsurerMap,
  policy: ManualPolicyUpdate,
};

class InsurerScreen extends Component {
  props: InsurerScreenProps

  componentWillUnmount() {
    this.props.dispatch(clearManualPolicy())
  }

  handleNextPress = () => {
    // TODO
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

    return (
      <AddPolicyScreenContainer
        enableNextButton={false}
        enablePrevButton={false}
        title={'Who is your insurer?'}
        onNextPress={this.handleNextPress}
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
