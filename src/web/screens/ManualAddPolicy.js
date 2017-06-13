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
          path="/app/policies/manual"
          exact
          render={() => <Redirect to="/app/policies/manual/insurer" />}
        />
        <Route path="/app/policies/manual/insurer" component={InsurerScreen} />
        <Route
          path="/app/policies/manual/policyNo"
          component={PolicyNumberScreen}
        />
        <Route
          path="/app/policies/manual/expiryDate"
          component={PolicyDateScreen}
        />
        <Route path="/app/policies/manual/cost" component={PolicyCostScreen} />
        <Route
          path="/app/policies/manual/vehicleRegistration"
          component={LicensePlateScreen}
        />
        <Route
          path="/app/policies/manual/ownership"
          component={VehicleOwnershipScreen}
        />
        <Route
          path="/app/policies/manual/finished"
          component={FinishedScreen}
        />
      </Container>
    )
  }
}
