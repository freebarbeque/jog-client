/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { ReduxState, FirebaseUser, MotorPolicy, MotorPolicyMap, Dispatch } from 'jog/src/types'
import { CREAM, PINK } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { clearPolicies } from 'jog/src/data/policies'
import { selectPolicies } from 'jog/src/store/policies/selectors'
import BackgroundHeader from 'jog/src/components/BackgroundHeader'
import Spinner from 'jog/src/components/Spinner'

import MotorPolicyCard from './MotorPolicyCard'
import AddMotorPolicyCard from './AddMotorPolicyCard'
import GetStartedScreen from '../GetStartedScreen'

type PoliciesProps = {
  user: FirebaseUser | null,
  policies: MotorPolicyMap,
  initialised: boolean,
  dispatch: Dispatch
};

class Policies extends Component {
  props: PoliciesProps

  clearMockPolicies = () => {
    const user = this.props.user
    if (user) {
      clearPolicies(user.uid).then(() => {
        console.info('Cleared mock policies')
      }).catch((err) => {
        console.error('Error adding mock policies', err.stack)
      })
    }
  }

  renderNoPolicies() {
    return (
      <GetStartedScreen
        onGetStartedPress={() => {
          this.props.dispatch(NavigationActions.navigate({
            routeName: 'AddPolicy'
          }))
        }}
      />
    )
  }

  renderPolicies() {
    const policies = this.props.policies
    const numPolicies = _.keys(policies).length

    return (
      <View style={{ flex: 1 }}>
        <BackgroundHeader
          headerText={numPolicies ? 'Dashboard' : 'Motor Policies'}
          subheaderText={numPolicies ? "Let's get started" : null}
        />
        <ScrollView style={styles.content}>
          {_.map(_.values(policies), (policy: MotorPolicy, idx: number) => {
            return (
              <MotorPolicyCard
                key={idx}
                policy={policy}
                index={idx}
                onPress={() => {
                  this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'PolicyDetails',
                    params: {
                      policyId: policy.id,
                      policyIndex: idx + 1,
                    },
                  })
                )
                }}
              />
            )
          })}
          <AddMotorPolicyCard
            onPress={() => {
              this.props.dispatch(
              NavigationActions.navigate({
                routeName: 'AddPolicy',
              })
            )
            }}
          />
        </ScrollView>
      </View>
    )
  }

  render() {
    const policies = this.props.policies
    const initialised = this.props.initialised
    const numPolicies = _.keys(policies).length

    if (initialised) {
      return (
        <View style={styles.container}>
          {numPolicies ? this.renderPolicies() : this.renderNoPolicies()}
        </View>
      )
    }

    return (
      <View style={[styles.content, { alignItems: 'center', justifyContent: 'center' }]}>
        <Spinner text="Loading your policies..." />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: CREAM,
    padding: MARGIN.large
  },

  mockPoliciesButton: {
    backgroundColor: PINK,
    height: 40,
    borderRadius: 4,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  policies: selectPolicies(state),
  initialised: state.policies.initialised
})

export default connect(
  mapStateToProps,
)(Policies)
