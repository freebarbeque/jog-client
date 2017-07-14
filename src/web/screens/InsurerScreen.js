/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import _ from 'lodash'

import type {
  Dispatch,
  Insurer,
  InsurerMap,
  ReduxState,
} from '../../common/types'
import { updateManualPolicy } from '../../common/store/screens/addManualPolicy/actions'
import type { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import Picker from '../components/Picker'

type InsurerScreenProps = {
  dispatch: Dispatch,
  insurers: InsurerMap,
  policy: ManualPolicyUpdate,
}

class InsurerScreen extends Component {
  props: InsurerScreenProps

  handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/policyNo'))
  }

  onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

  render() {
    const options = [
      ..._.map(this.props.insurers, (insurer: Insurer, id: string) => {
        return {
          label: insurer.name,
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
      if (companyId === 'other') {
        company = { name: 'Other' }
      } else {
        company = this.props.insurers[companyId]
      }
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
            value={
              company && companyId && company.name
                ? { value: companyId, label: company.name }
                : null
            }
            placeholder="Insurer"
            options={options}
          />
        </div>
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  insurers: state.insurers.insurers,
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(InsurerScreen)
