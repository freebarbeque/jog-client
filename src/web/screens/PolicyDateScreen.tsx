import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

const moment = require('moment')

import { Dispatch, ReduxState, Action } from '../../common/types'
import { updateManualPolicy } from '../../common/store/screens/addManualPolicy/actions'
import { ManualPolicyUpdate } from '../../common/store/screens/addManualPolicy/actions'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import DatePicker from '../components/DatePicker'


interface PolicyDateScreenProps extends DispatchProp<Action> {
  policy: ManualPolicyUpdate,
}

class PolicyDateScreen extends React.Component<PolicyDateScreenProps> {
  handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/cost'))
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
        />
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyDateScreen)
