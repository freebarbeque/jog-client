/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import firebase from 'firebase'

import type { Dispatch, ReduxState, FirebaseUser, MotorPolicy } from 'jog/src/types'

import Text from 'jog/src/components/Text'
import { CREAM, PINK } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { Background } from 'jog/src/components/images'

import AddPolicyMenu from './AddPolicyMenu'
import MotorPolicyCard from './MotorPolicyCard'
import AddMotorPolicyCard from './AddMotorPolicyCard'

type PoliciesProps = {
  user: FirebaseUser | null,
};

type PoliciesScreenState = {
  policies: Map<string, MotorPolicy>,
}

class Policies extends Component {
  props: PoliciesProps
  state: PoliciesScreenState

  constructor(props: PoliciesProps) {
    super(props)
    this.state = {
      policies: new Map()
    }
  }

  // This would normally be wrapped up in a saga but it will be deleted soon so no point.
  generateMockPolicies = () => {
    const user = this.props.user
    if (user) {
      this.setState({
        policies: new Map(Object.entries({
          awesomepolicy: {
            vehicleRegistration: 'Chrysler Pacifica',
            levelOfCover: 'comprehensive',
            id: 'awesomepolicy',
            policyNo: '1234567',
            expiryDate: moment().add({ days: 64 }).toDate().getTime(),
            startDate: moment().subtract({ days: 100 }).toDate().getTime(),
            uid: 'cHuC2t8V5DcvLxdNhbCqjYhBA672',
            jogCreatedDate: firebase.database.ServerValue.TIMESTAMP,
            companyId: 'admiral',
            documentPaths: [],
            excess: 400,
            type: 'motor',
            drivers: [
              {
                firstNames: 'Richard',
                lastName: 'Gill'
              }
            ],
            noClaimsBonus: 4,
          }
        }))
      })
    }
  }

  renderNoPolicies() {
    return (
      <View style={styles.content}>
        <AddPolicyMenu
          onEmailPress={() => {}}
          onPhotographPress={() => {}}
          onManualPress={() => {}}
        />
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: MARGIN.large }}>
          <TouchableOpacity style={styles.mockPoliciesButton} onPress={this.generateMockPolicies}>
            <Text>
              Generate Mock Policies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderPolicies() {
    const policies = this.state.policies

    return (
      <ScrollView style={styles.content}>
        {_.map(Array.from(policies), (p: MotorPolicy, idx: number) => {
          return (
            <MotorPolicyCard
              key={p.id}
              policy={p}
              index={idx}
              onPress={() => {}}
            />
          )
        })}
        <AddMotorPolicyCard
          onPress={() => {}}
        />
      </ScrollView>
    )
  }

  render() {
    const numPolicies = this.state.policies.size

    return (
      <View style={styles.container}>
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
        {numPolicies ? this.renderPolicies() : this.renderNoPolicies()}
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
  content: {
    flex: 1,
    backgroundColor: CREAM,
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
  policies: state.policies
})

export default connect(
  mapStateToProps,
)(Policies)
