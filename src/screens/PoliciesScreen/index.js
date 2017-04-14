/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Spinner from 'react-native-spinkit'

import type { ReduxState, FirebaseUser, MotorPolicy, MotorPolicyMap, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { CREAM, PINK, BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { Background } from 'jog/src/components/images'
import { clearPolicies } from 'jog/src/data/policies'
import { selectPolicies } from 'jog/src/store/policies/selectors'

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
        <Background style={styles.backgroundImage}>
          <View style={styles.backgroundImageOverlay} />
          <View>
            <Text style={styles.header}>
              {numPolicies ? 'Dashboard' : 'Motor Policies'}
            </Text>
            {!numPolicies && <Text>
              {"Let's get started"}
            </Text>}
          </View>
        </Background>
        <ScrollView style={styles.content}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: MARGIN.large
            }}
          >
            <TouchableOpacity style={styles.mockPoliciesButton} onPress={this.clearMockPolicies}>
              <Text>
              Clear Mock Policies
            </Text>
            </TouchableOpacity>
          </View>
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
                      policyId: policy.id
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
        <Spinner type="Bounce" color={BLUE} size={60} />
        <Text style={{ color: BLUE, marginTop: MARGIN.large }}>
          Loading your policies...
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: 100,
    resizeMode: 'cover',
    width: null,
    justifyContent: 'center',
    padding: MARGIN.large
  },
  backgroundImageOverlay: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  content: {
    flex: 1,
    backgroundColor: CREAM,
    padding: MARGIN.large
  },

  header: {
    fontSize: 20,
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
