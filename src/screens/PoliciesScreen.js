/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, ReduxState, FirebaseUser, MotorPolicy } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { syncMotorPolicies, unsyncMotorPolicies } from 'jog/src/redux/policies/actions'

type PoliciesProps = {
  dispatch: Dispatch,
  user: FirebaseUser | null,
  policies: Map<string, MotorPolicy>,
};

class Policies extends Component {
  props: PoliciesProps

  componentDidMount() {
    const user = this.props.user
    if (user) {
      this.props.dispatch(syncMotorPolicies(user.uid))
    }
  }

  componentWillReceiveProps(props: PoliciesProps) {
    const newUserId = props.user && props.user.uid
    const priorUserId = this.props.user && this.props.user.uid

    if (newUserId !== priorUserId) {
      if (priorUserId) {
        this.props.dispatch(unsyncMotorPolicies())
      }
      if (newUserId) {
        this.props.dispatch(syncMotorPolicies(newUserId))
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(unsyncMotorPolicies())
  }

  render() {
    const numPolicies = this.props.policies.size
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          You have {numPolicies} {numPolicies === 1 ? 'policy' : 'policies'}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.base
  },
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  policies: state.policies
})


export default connect(
  mapStateToProps,
)(Policies)
