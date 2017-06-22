import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import InsurerScreen from './InsurerScreen'
import PolicyNumberScreen from './PolicyNumberScreen'
import PolicyDateScreen from './PolicyDateScreen'
import PolicyCostScreen from './PolicyCostScreen'
import VehicleOwnershipScreen from './VehicleOwnershipScreen'
import FinishedScreen from './FinishedScreen'
import LicensePlateScreen from './LicensePlateScreen'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default class ManualAddPolicy extends Component {
  render() {
    return (
      <Container>
        <Route
          path="/app/addManualPolicy"
          exact
          render={() => <Redirect to="/app/addManualPolicy/insurer" />}
        />
        <Route path="/app/addManualPolicy/insurer" component={InsurerScreen} />
        <Route
          path="/app/addManualPolicy/policyNo"
          component={PolicyNumberScreen}
        />
        <Route
          path="/app/addManualPolicy/expiryDate"
          component={PolicyDateScreen}
        />
        <Route path="/app/addManualPolicy/cost" component={PolicyCostScreen} />
        <Route
          path="/app/addManualPolicy/vehicleRegistration"
          component={LicensePlateScreen}
        />
        <Route
          path="/app/addManualPolicy/ownership"
          component={VehicleOwnershipScreen}
        />
        <Route
          path="/app/addManualPolicy/finished"
          component={FinishedScreen}
        />
      </Container>
    )
  }
}
