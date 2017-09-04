import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import {
  IManualPolicyUpdate,
  updateManualPolicy,
} from '../../common/store/screens/addManualPolicy/actions'
import { Action, IReduxState } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'
import DatePicker from '../components/DatePicker'

interface IPolicyDateScreenProps extends DispatchProp<Action> {
  policy: IManualPolicyUpdate
}

class PolicyDateScreen extends React.Component<IPolicyDateScreenProps> {
  public render() {
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

  private handleNextPress = () => {
    this.props.dispatch(push('/app/addManualPolicy/cost'))
  }

  private handleChange = (_e, date) => {
    const expiryDate = moment(date).format('DD/MM/YYYY')
    this.props.dispatch(updateManualPolicy({ expiryDate }))
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policy: state.screens.addManualPolicy,
})

export default connect(mapStateToProps)(PolicyDateScreen)
