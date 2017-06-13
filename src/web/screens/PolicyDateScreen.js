/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'

import type { Dispatch, ReduxState } from '../../common/types'
import {
  ManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import { BLUE } from '../../common/constants/palette'

type PolicyDateScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
}

class PolicyDateScreen extends Component {
  props: PolicyDateScreenProps

  handleNextPress = () => {
    this.props.dispatch(push('/app/policies/manual/cost'))
  }

  handleChange = (e, date) => {
    const expiryDate = moment(date).format('DD/MM/YYYY')
    this.props.dispatch(updateManualPolicy({ expiryDate }))
  }

  render() {
    const expiryDateString = this.props.policy.expiryDate
    const expiryDate = expiryDateString
      ? moment(expiryDateString, 'DD/MM/YYYY').toDate()
      : null

    console.log('expiryDate', expiryDateString, expiryDate)

    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        title="When does the policy expire?"
        onNextPress={this.handleNextPress}
        disableNextButton={!expiryDateString}
      >
        <DatePicker
          className="date-picker"
          onChange={this.handleChange}
          hintText="Expiry Date"
          name="expiryDate"
          id="policy-expiryDate"
          value={expiryDate}
          style={{
            color: `${BLUE} !important`,
          }}
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyDateScreen)
