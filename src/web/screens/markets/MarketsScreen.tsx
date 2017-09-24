import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

import AddressScreen from './AddressScreen'
import DriverScreen from './DriverScreen'
import MotorQuoteScreen from './MotorQuoteScreen'
import QuoteRequestsScreen from './QuoteRequestsScreen'
import VehicleScreen from './VehicleScreen'

export default class MarketsScreen extends React.Component {
  public render() {
    return (
      <div className="MarketsScreen">
        <Route
          path="/app/tabs/policies/:policyId/quotes"
          exact
          component={QuoteRequestsScreen}
        />
        <Route
          path="/app/tabs/policies/:policyId/quotes/motor"
          exact
          render={() =>
            <Redirect
              to={`/app/tabs/policies/:policyId/quotes/motor/${uuid()}`}
            />}
        />
        <Switch>
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/address"
            exact
            component={AddressScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/address/:addressId"
            exact
            component={AddressScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/driver"
            exact
            component={DriverScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/driver/:driverId"
            component={DriverScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/vehicle"
            exact
            component={VehicleScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/vehicle/:vehicleId"
            component={VehicleScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/:quoteId"
            exact
            component={MotorQuoteScreen}
          />
        </Switch>
      </div>
    )
  }
}
