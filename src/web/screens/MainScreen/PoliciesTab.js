import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { MotorPolicyMap, ReduxState } from '../../../common/types'
import { selectPolicies } from '../../../common/store/policies/selectors'
import MotorPolicyCard from './MotorPolicyCard'
import { MARGIN } from '../../../common/constants/style'

type PoliciesTabProps = {
  policies: MotorPolicyMap,
}

class PoliciesTab extends Component {
  props: PoliciesTabProps

  componentDidMount() {}

  handlePolicyPress() {}

  render() {
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
