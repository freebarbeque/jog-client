import * as React from 'react'
import { Route, Switch } from 'react-router'
import AddressScreen from './markets/AddressScreen'
import AddVehicleScreen from './markets/AddVehicleScreen'
import DriverScreen from './markets/DriverScreen'
import MotorQuoteScreen from './markets/MotorQuoteScreen'
import QuoteOverviewScreen from './markets/QuoteRequestsScreen'

export default class PolicyQuotesScreen extends React.Component {
  public render() {
    return (
      <div className="PolicyQuotesScreen">
        <Route
          path="/app/tabs/policies/:policyId/quotes"
          exact
          component={QuoteOverviewScreen}
        />
        <Route
          path="/app/tabs/policies/:policyId/quotes/motor"
          exact
          component={MotorQuoteScreen}
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
            component={AddVehicleScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId/quotes/motor/vehicle/:vehicleId"
            component={AddVehicleScreen}
          />
        </Switch>
      </div>
    )
  }
}
