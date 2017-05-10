// @flow

import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import Text from 'jog/src/components/Text'

import type { MotorPolicy, ReactNavigationProp } from '../types'
import { LEVEL_OF_COVER } from '../types'
import { selectPolicies } from '../store/policies/selectors'
import { BLUE, CREAM, WHITE } from '../constants/palette'
import { MARGIN } from '../constants/style'
import { CarOutline, Chevron } from '../components/images/index'
import Panel from '../components/Panel'

const Field = (props) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldTitle}>
      {props.title.toUpperCase()}
    </Text>
    <Text style={styles.fieldValue}>
      {props.children}
    </Text>
  </View>
)

const Row = (props) => {
  return (
    <View style={styles.rowContainer}>
      <Field title={props.title}>
        {props.children}
      </Field>
    </View>
  )
}

type PolicyDetailsScreenProps = {
  policies: MotorPolicy,
  navigation: ReactNavigationProp
}

class PolicyDetailsScreen extends Component {
  props: PolicyDetailsScreenProps

  render() {
    const navigationState = this.props.navigation.state
    console.log('navigationState', navigationState)
    const policyId = navigationState.params.policyId

    let policy: MotorPolicy

    // Typecheck demanded by Flow
    if (typeof policyId === 'string') {
      policy = this.props.policies[policyId]
    } else {
      throw new TypeError('PolicyDetailsScreen was expecting a policyId of type string in the navigation params.')
    }

    const expiryDate = moment(policy.expiryDate)

    const drivers = policy.drivers || []

    return (
      <ScrollView style={styles.scrollView}>
        <Panel>
          <Field title="vehicle registration">
            {policy.vehicleRegistration}
          </Field>

          <Field title="expires">
            {expiryDate.format('DD MMM YYYY')}
          </Field>

          <Field title="insurance company">
            {policy.companyName}
          </Field>

          <Field title="policy no.">
            {policy.policyNo}
          </Field>

          <Field title="cost">
            £{policy.cost} p/a
          </Field>

          <View style={styles.daysRemainingContainer}>
            <Text style={styles.daysRemainingTitle}>
              DAYS REMAINING
            </Text>
            <Text style={styles.daysRemainingValue}>
              {expiryDate.diff(moment(), 'days')}
            </Text>
          </View>

          <View style={styles.carOutline}>
            <CarOutline scale={1.3} />
          </View>
        </Panel>
        <View>
          <View style={styles.policyHeader}>
            <Text style={styles.policyHeaderText}>
              Policy
            </Text>
            <Chevron />
          </View>
          <Row title="level of cover">
            {LEVEL_OF_COVER[policy.levelOfCover]}
          </Row>
          <Row title="excess">
            £{policy.excess} p/a
          </Row>
          <Row title="drivers">
            {drivers.map((d) => `${d.firstName} ${d.lastName}`).join(', ')}
          </Row>
          <Row title="no claims bonus">
            {policy.noClaimsBonus} Yrs
          </Row>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  fieldContainer: { marginLeft: MARGIN.base, marginRight: MARGIN.base, marginTop: MARGIN.base },
  fieldTitle: { color: 'rgb(164,169,174)', fontSize: 11, fontWeight: '600' },
  fieldValue: { color: BLUE, fontSize: 16 },
  rowContainer: {
    borderBottomColor: 'rgb(203,203,203)',
    borderBottomWidth: 1,
    backgroundColor: 'rgb(240,240,240)',
    height: 48
  },
  daysRemainingContainer: { position: 'absolute', top: MARGIN.large, right: MARGIN.large },
  daysRemainingTitle: { color: 'rgb(164,169,174)', fontSize: 11, fontWeight: '600' },
  daysRemainingValue: { color: BLUE, fontSize: 58, fontWeight: '300', textAlign: 'center', marginTop: -6 },
  carOutline: { position: 'absolute', bottom: MARGIN.large, right: MARGIN.large },
  policyHeader: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: MARGIN.large
  },
  policyHeaderText: { fontSize: 16, color: BLUE, margin: MARGIN.large, flex: 1 },
  scrollView: { backgroundColor: CREAM }
})

const mapStateToProps = (state) => ({ policies: selectPolicies(state) })

export default connect(mapStateToProps)(PolicyDetailsScreen)
