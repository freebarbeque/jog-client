import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { push } from 'react-router-redux'
import { Route } from 'react-router-dom'

import { Dispatch, MotorPolicyMap, ReduxState } from '../../../common/types'
import { selectPolicies } from '../../../common/store/policies/selectors'
import MotorPolicyCard from './MotorPolicyCard'
import { MARGIN } from '../../../common/constants/style'
import AddMotorPolicyCard from './AddMotorPolicyCard'
import AddPolicyScreen from '../AddPolicyScreen'
import GetStartedScreen from '../GetStartedScreen'

type PoliciesTabProps = {
  policies: MotorPolicyMap,
  dispatch: Dispatch,
}

class PoliciesTab extends Component {
  props: PoliciesTabProps

  componentDidMount() {}

  handlePolicyPress() {}

  handleAddPolicyPress = () => {
    this.props.dispatch(push('/app/policies/addPolicy'))
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
            onPress={this.handlePolicyPress}
          />,
        )}
        {<AddMotorPolicyCard onPress={this.handleAddPolicyPress} />}
      </div>
    )
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Route
          path="/app/policies"
          exact
          render={() => {
            return _.values(this.props.policies).length
              ? this.renderPolicies()
              : this.renderNoPolicies()
          }}
        />
        <Route
          path="/app/policies/addPolicy"
          exact
          component={AddPolicyScreen}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    policies: selectPolicies(state),
  }
}

export default connect(mapStateToProps)(PoliciesTab)
