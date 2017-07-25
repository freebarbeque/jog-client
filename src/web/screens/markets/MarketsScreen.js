import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import type { Dispatch, ReduxState } from '../../../common/types'
import type { MarketsReduxState } from '../../../common/store/markets/index'

import Container from '../../components/Container'
import MotorQuoteScreen from './MotorQuoteScreen'
import AddressScreen from './AddressScreen'
import DriverScreen from './DriverScreen'

type MarketsScreenProps = {
  markets: MarketsReduxState,
  dispatch: Dispatch,
}

class MarketsScreen extends Component {
  props: MarketsScreenProps

  render() {
    return (
      <Container className="MarketsScreen">
        <Route
          path="/app/tabs/markets/motor"
          exact
          component={MotorQuoteScreen}
        />
        <Route
          path="/app/tabs/markets/motor/address"
          component={AddressScreen}
        />
        <Route path="/app/tabs/markets/motor/driver" component={DriverScreen} />
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  markets: state.markets,
}))(MarketsScreen)
