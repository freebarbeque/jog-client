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

  render() {
    const policies = this.props.policies

    return (
      <div>
        <Route
          path="/app/policies"
          exact
          render={() => {
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
