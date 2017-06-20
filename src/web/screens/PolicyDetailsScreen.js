// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'
import { MARGIN } from '../../common/constants/style'
import { BLUE, CREAM, WHITE, YELLOW } from '../../common/constants/palette'
import { selectPolicies } from '../../common/store/policies/selectors'
import {
  Dispatch,
  LEVEL_OF_COVER,
  MotorPolicy,
  ReactNavigationProp,
} from '../../common/types'
import BigRedFullWidthButton from '../components/BigRedFullWidthButton'
import { CarOutline, Chevron } from '../components/images/index'
import Panel from '../components/Panel'

// language=SCSS prefix=dummy{ suffix=}
const FieldContainer = styled.div`
  margin-left: ${MARGIN.base}px;
  margin-right: ${MARGIN.base}px;
  margin-top: ${MARGIN.base}px;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldTitle = styled.div`
    color: rgb(164,169,174);
    font-size: 11px;
    font-weight: 600;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldValue = styled.div`
  color: ${BLUE}; 
  font-size: 16px;
`

// language=SCSS prefix=dummy{ suffix=}
const RowContainer = styled.div`
    border-bottom-color: rgb(203,203,203);
    border-bottom-width: 1px;
    background-color: rgb(240,240,240);
    height: 48px;
`

// language=SCSS prefix=dummy{ suffix=}
const DaysRemainingContainer = styled.div`
  position: absolute;
  top: ${MARGIN.large}px;
  right: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const DaysRemainingTitle = styled.div`
    color: rgb(164,169,174);
    font-size: 11px;
    font-weight: 600
`

// language=SCSS prefix=dummy{ suffix=}
const DaysRemainingValue = styled.div`
  color: ${BLUE};
  font-size: 58px;
  font-weight: 300;
  text-align: center;
  margin-top: -6px;
`

// language=SCSS prefix=dummy{ suffix=}
const PolicyHeader = styled.div`
  background-color: ${WHITE};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: ${MARGIN.large}px;
  font-size: 16px;
  color: ${BLUE};
  margin: ${MARGIN.large}px;
  flex: 1,
`

const Field = props =>
  <FieldContainer>
    <FieldTitle>
      {props.title.toUpperCase()}
    </FieldTitle>
    <FieldValue>
      {props.children}
    </FieldValue>
  </FieldContainer>

const Row = props => {
  return (
    <RowContainer>
      <Field title={props.title}>
        {props.children}
      </Field>
    </RowContainer>
  )
}

type PolicyDetailsScreenProps = {
  policies: MotorPolicy,
  navigation: ReactNavigationProp,
  dispatch: Dispatch,
}

class PolicyDetailsScreen extends Component {
  props: PolicyDetailsScreenProps

  handleDocumentUploadPress = () => {
    // TODO
  }

  getPolicy(): MotorPolicy {
    const navigationState = this.props.navigation.state
    const policyId = navigationState.params.policyId

    let policy: MotorPolicy

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

  renderPolicyDocumentsButton() {
    const policy = this.getPolicy()

    if (policy && !policy.complete && _.values(policy.documents).length) {
      return (
        <BigRedFullWidthButton
          style={{
            marginTop: MARGIN.base,
            backgroundColor: YELLOW,
            color: BLUE,
          }}
          onPress={this.handleDocumentUploadPress}
        >
          {"We're currently processing your policy documents."}
        </BigRedFullWidthButton>
      )
    } else if (policy && !policy.complete) {
      return (
        <BigRedFullWidthButton
          style={{ marginTop: MARGIN.base }}
          onPress={this.handleDocumentUploadPress}
        >
          Please upload your policy documentation for a profile
        </BigRedFullWidthButton>
      )
    }

    return null
  }

  render() {
    const policy = this.getPolicy()

    const expiryDate = moment(policy.expiryDate)

    const drivers = policy.drivers || []

    return (
      <div
        style={{
          overflow: 'scroll',
          backgroundColor: CREAM,
        }}
      >
        <Panel>
          <Field title="vehicle registration">
            {policy.vehicleRegistration}
          </Field>

          <Field title="expires">
            {expiryDate.format('DD MMM YYYY')}
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

          <DaysRemainingContainer>
            <DaysRemainingTitle>
              DAYS REMAINING
            </DaysRemainingTitle>
            <DaysRemainingValue>
              {expiryDate.diff(moment(), 'days')}
            </DaysRemainingValue>
          </DaysRemainingContainer>

          <CarOutline
            scale={1.3}
            style={{
              position: 'absolute',
              bottom: MARGIN.large,
              right: MARGIN.large,
            }}
          />
        </Panel>
        <div>
          <PolicyHeader>
            Policy
            <Chevron />
          </PolicyHeader>
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
        </div>
        {this.renderPolicyDocumentsButton()}
      </div>
    )
  }
}

const mapStateToProps = state => ({ policies: selectPolicies(state) })

export default connect(mapStateToProps)(PolicyDetailsScreen)
