import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import {
  Dispatch,
  MotorPolicy,
  MotorPolicyMap,
  ReduxState,
} from '../../../common/types'
import { selectInitialisedPolicies } from '../../../common/store/policies/selectors'
import MotorPolicyCard from './MotorPolicyCard'
import { MARGIN } from '../../../common/constants/style'
import AddMotorPolicyCard from './AddMotorPolicyCard'
import AddPolicyScreen from '../AddPolicyScreen'
import GetStartedScreen from '../GetStartedScreen'
import PolicyDetailsScreen from '../PolicyDetailsScreen'

type PoliciesTabProps = {
  policies: MotorPolicyMap,
  dispatch: Dispatch,
}

class PoliciesTab extends Component {
  props: PoliciesTabProps

  componentDidMount() {}

  handlePolicyPress(p: MotorPolicy) {
    this.props.dispatch(push(`/app/tabs/policies/${p.id}`))
  }

  handleAddPolicyPress = () => {
    this.props.dispatch(push('/app/tabs/policies/addPolicy'))
  }

  renderNoPolicies() {
    return <GetStartedScreen />
  }

  renderPolicies() {
    const policies = this.props.policies

    return (
      <div
        style={{
          padding: MARGIN.base,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {_.values(policies).map((p, idx) =>
          <MotorPolicyCard
            key={p.id}
            policy={p}
            index={idx}
            onPress={() => this.handlePolicyPress(p)}
          />,
        )}
        <AddMotorPolicyCard onPress={this.handleAddPolicyPress} />
      </div>
    )
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Switch>
          <Route
            path="/app/tabs/policies"
            exact
            render={() => {
              const numPolicies = _.values(this.props.policies).length
              return numPolicies
                ? this.renderPolicies()
                : this.renderNoPolicies()
            }}
          />
          <Route
            path="/app/tabs/policies/addPolicy"
            component={AddPolicyScreen}
          />
          <Route
            path="/app/tabs/policies/:policyId"
            component={PolicyDetailsScreen}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    policies: selectInitialisedPolicies(state),
  }
}

export default connect(mapStateToProps)(PoliciesTab)
