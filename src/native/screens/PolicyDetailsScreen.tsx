import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import Text from '~/native/components/Text'

import * as _ from 'lodash'
import { BLUE, CREAM, WHITE, YELLOW } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { selectPolicies } from '~/common/store/policies/selectors'
import {
  IMotorPolicy,
  IMotorPolicyMap,
  IReactNavigationProp,
  LEVEL_OF_COVER,
} from '~/common/types'
import BigRedFullWidthButton from '../components/BigRedFullWidthButton'
import { CarOutline } from '../components/images/index'
import Panel from '../components/Panel'

const moment = require('moment')

const Field = props =>
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldTitle}>
      {props.title.toUpperCase()}
    </Text>
    <Text style={styles.fieldValue}>
      {props.children}
    </Text>
  </View>

const Row = props => {
  return (
    <View style={styles.rowContainer}>
      <Field title={props.title}>
        {props.children}
      </Field>
    </View>
  )
}

interface IProps extends DispatchProp<any> {
  policies: IMotorPolicyMap
  navigation: IReactNavigationProp
}

class PolicyDetailsScreen extends React.Component<IProps> {
  public render() {
    const policy = this.getPolicy()

    const expiryDate = policy.expiryDate ? moment(policy.expiryDate) : ''

    const drivers = policy.drivers || []

    return (
      <ScrollView style={styles.scrollView}>
        <Panel>
          <Field title="vehicle registration">
            {policy.vehicleRegistration}
          </Field>

          <Field title="expires">
            {expiryDate ? expiryDate.format('DD MMM YYYY') : ''}
          </Field>

          <Field title="insurance company">
            {policy.companyName || 'Other'}
          </Field>

          <Field title="policy no.">
            {policy.policyNo}
          </Field>

          <Field title="cost">
            {policy.cost ? `£${policy.cost} p/a` : '-'}
          </Field>

          <View style={styles.daysRemainingContainer}>
            <Text style={styles.daysRemainingTitle}>DAYS REMAINING</Text>
            <Text style={styles.daysRemainingValue}>
              {expiryDate ? expiryDate.diff(moment(), 'days') : ''}
            </Text>
          </View>

          <View style={styles.carOutline}>
            <CarOutline scale={1.3} />
          </View>
        </Panel>
        <View>
          <View style={styles.policyHeader}>
            <Text style={styles.policyHeaderText}>Policy</Text>
          </View>
          <Row title="level of cover">
            {policy.levelOfCover ? LEVEL_OF_COVER[policy.levelOfCover] : '-'}
          </Row>
          <Row title="excess">
            {policy.excess ? `£${policy.excess} p/a` : '-'}
          </Row>
          <Row title="drivers">
            {drivers && drivers.length
              ? drivers
                  .map(d => `${d.firstName || ''} ${d.lastName || ''}`)
                  .join(', ')
              : '-'}
          </Row>
          <Row title="no claims bonus">
            {policy.noClaimsBonus ? `${policy.noClaimsBonus} Yrs` : '-'}
          </Row>
        </View>
        {this.renderPolicyDocumentsButton()}
      </ScrollView>
    )
  }

  private handleDocumentUploadPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Documents' }))
  }

  private getPolicy(): IMotorPolicy {
    const navigationState = this.props.navigation.state
    console.log('navigation', this.props.navigation)
    const policyId = navigationState.params.policyId

    let policy: IMotorPolicy

    // Typecheck demanded by Flow
    if (typeof policyId === 'string') {
      policy = this.props.policies[policyId]
    } else {
      throw new TypeError(
        'PolicyDetailsScreen was expecting a policyId of type string in the navigation params.',
      )
    }

    if (!policy) {
      throw new Error(
        `Policy with id ${policyId} does not exist so cannot render the policy details screen`,
      )
    }

    return policy
  }

  private renderPolicyDocumentsButton() {
    const policy = this.getPolicy()

    if (policy && !policy.complete && _.values(policy.documents).length) {
      return (
        <BigRedFullWidthButton
          style={{ marginTop: MARGIN.base, backgroundColor: YELLOW }}
          onPress={this.handleDocumentUploadPress}
        >
          <Text style={{ color: BLUE }}>
            {"We're currently processing your policy documents."}
          </Text>
        </BigRedFullWidthButton>
      )
    } else if (policy && !policy.complete) {
      return (
        <BigRedFullWidthButton
          style={{ marginTop: MARGIN.base }}
          onPress={this.handleDocumentUploadPress}
        >
          <Text>Please upload your policy documentation for a profile</Text>
        </BigRedFullWidthButton>
      )
    }

    return null
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginLeft: MARGIN.base,
    marginRight: MARGIN.base,
    marginTop: MARGIN.base,
  },
  fieldTitle: { color: 'rgb(164,169,174)', fontSize: 11, fontWeight: '600' },
  fieldValue: { color: BLUE, fontSize: 16 },
  rowContainer: {
    borderBottomColor: 'rgb(203,203,203)',
    borderBottomWidth: 1,
    backgroundColor: 'rgb(240,240,240)',
    height: 48,
  },
  daysRemainingContainer: {
    position: 'absolute',
    top: MARGIN.large,
    right: MARGIN.large,
  },
  daysRemainingTitle: {
    color: 'rgb(164,169,174)',
    fontSize: 11,
    fontWeight: '600',
  },
  daysRemainingValue: {
    color: BLUE,
    fontSize: 58,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: -6,
  },
  carOutline: {
    position: 'absolute',
    bottom: MARGIN.large,
    right: MARGIN.large,
  },
  policyHeader: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: MARGIN.large,
  },
  policyHeaderText: {
    fontSize: 16,
    color: BLUE,
    margin: MARGIN.large,
    flex: 1,
  },
  scrollView: { backgroundColor: CREAM },
})

const mapStateToProps = state => ({ policies: selectPolicies(state) })

export default connect(mapStateToProps)(PolicyDetailsScreen)
