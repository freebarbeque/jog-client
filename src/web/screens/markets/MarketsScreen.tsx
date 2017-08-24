import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

import Container from '../../components/Container'
import AddressScreen from './AddressScreen'
import DriverScreen from './DriverScreen'
import MotorQuoteScreen from './MotorQuoteScreen'
import QuoteRequestsScreen from './QuoteRequestsScreen'
import VehicleScreen from './VehicleScreen'

export default class MarketsScreen extends React.Component {
  public render() {
    return (
      <Container className="MarketsScreen">
        <Route path="/app/tabs/markets" exact component={QuoteRequestsScreen} />
        <Route
          path="/app/tabs/markets/motor"
          exact
          render={() => <Redirect to={`/app/tabs/markets/motor/${uuid()}`} />}
        />
        <Switch>
          <Route
            path="/app/tabs/markets/motor/address"
            exact
            component={AddressScreen}
          />
          <Route
            path="/app/tabs/markets/motor/address/:addressId"
            exact
            component={AddressScreen}
          />
          <Route
            path="/app/tabs/markets/motor/driver"
            exact
            component={DriverScreen}
          />
          <Route
            path="/app/tabs/markets/motor/driver/:driverId"
            component={DriverScreen}
          />
          <Route
            path="/app/tabs/markets/motor/vehicle"
            exact
            component={VehicleScreen}
          />
          <Route
            path="/app/tabs/markets/motor/vehicle/:vehicleId"
            component={VehicleScreen}
          />
          <Route
            path="/app/tabs/markets/motor/:quoteId"
            exact
            component={MotorQuoteScreen}
          />
        </Switch>
      </Container>
    )
  }
}
