import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import InsurerScreen from './InsurerScreen'
import PolicyNumberScreen from './PolicyNumberScreen'
import PolicyDateScreen from './PolicyDateScreen'
import PolicyCostScreen from './PolicyCostScreen'
import VehicleOwnershipScreen from './VehicleOwnershipScreen'
import FinishedScreen from './FinishedScreen'
import LicensePlateScreen from './LicensePlateScreen'
import { isHandset } from '../store/selectors'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

interface ManualAddPolicyProps {
  isHandset: boolean
}

class ManualAddPolicy extends React.Component<ManualAddPolicyProps> {
  componentWillReceiveProps(nextProps: ManualAddPolicyProps) {
    const switchedToMobile = !this.props.isHandset && nextProps.isHandset
    const switchedToDesktop = this.props.isHandset && !nextProps.isHandset
    if (switchedToMobile || switchedToDesktop) {
      // TODO: Switch between mobile/desktop layout
      // this.props.dispatch(push('/app/addManualPolicy'))
    }
  }

  render() {
    return (
      <Container>
        <Route
          path="/app/addManualPolicy"
          exact
          render={() => {
            if (this.props.isHandset)
              return <Redirect to="/app/addManualPolicy/insurer" />
            return <span />
          }}
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

export default connect(state => ({ isHandset: isHandset(state) }))(
  ManualAddPolicy,
)
