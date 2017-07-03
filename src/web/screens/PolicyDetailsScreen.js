// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { MARGIN } from '../../common/constants/style'
import { BLUE, CREAM, WHITE, YELLOW } from '../../common/constants/palette'
import { selectPolicies } from '../../common/store/policies/selectors'
import {
  Dispatch,
  LEVEL_OF_COVER,
  MotorPolicy,
  ReduxState,
} from '../../common/types'
import BigRedFullWidthButton from '../components/BigRedFullWidthButton'
import Panel from '../components/Panel'
import * as selectors from '../store/selectors'
import { min } from '../media'
import Container from '../components/Container'

// language=SCSS prefix=dummy{ suffix=}
const PolicyDetailsPanel = styled(Panel)`
  ${min.smallTablet`
    padding-left: 0;
    padding-right: 0;
  `}
`

// language=SCSS prefix=dummy{ suffix=}
const FieldContainer = styled.div`
  margin-left: ${MARGIN.base}px;
  margin-right: ${MARGIN.base}px;
  margin-top: ${MARGIN.base}px;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldTitle = styled.div`
  color: rgb(164, 169, 174);
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
  border-bottom-color: rgb(203, 203, 203);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  background-color: rgb(240, 240, 240);
  height: 48px;
  display: flex;
  align-items: center;
`

// language=SCSS prefix=dummy{ suffix=}
const DaysRemainingContainer = styled.div`
  position: absolute;
  top: ${MARGIN.large}px;
  right: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const DaysRemainingTitle = styled.div`
  color: rgb(164, 169, 174);
  font-size: 11px;
  font-weight: 600;
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
const Header = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${MARGIN.large}px;
  padding-left: ${MARGIN.large}px;
  font-size: 16px;
  color: ${BLUE};
  margin-top: ${MARGIN.base}px;
  flex: 1;
  height: 47.931px;

  ${min.smallTablet`
    border-bottom-color: black;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-left: 0;
  `};
`

const Field = props => {
  const { title, children, ...rest } = props

  return (
    <FieldContainer className="Field" {...rest}>
      <FieldTitle>
        {title.toUpperCase()}
      </FieldTitle>
      <FieldValue>
        {children}
      </FieldValue>
    </FieldContainer>
  )
}

const Row = props => {
  const { title, children } = props
  return (
    <RowContainer className="Row">
      <Field title={title} style={{ marginTop: 0, marginBottom: 0 }}>
        {children}
      </Field>
    </RowContainer>
  )
}

type PolicyDetailsScreenProps = {
  policies: MotorPolicy,
  dispatch: Dispatch,
  initialised: boolean,
  isHandset: boolean,
}

class PolicyDetailsScreen extends Component {
  props: PolicyDetailsScreenProps

  componentDidMount() {}

  handleDocumentUploadPress = () => {
    const policy = this.getPolicy()
    if (policy) {
      this.props.dispatch(push(`/app/tabs/policies/${policy.id}/documents`))
    }
  }

  getPolicy(): MotorPolicy | null {
    const policyId = this.props.match.params.policyId
    let policy: MotorPolicy = null

    // Typecheck demanded by Flow
    if (typeof policyId === 'string') {
      policy = this.props.policies[policyId]
    } else {
      throw new TypeError(
        'PolicyDetailsScreen was expecting a policyId of type string in the navigation params.',
      )
    }

    if (!policy && this.props.initialised) {
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
          onClick={this.handleDocumentUploadPress}
        >
          {"We're currently processing your policy documents."}
        </BigRedFullWidthButton>
      )
    } else if (policy && !policy.complete) {
      return (
        <BigRedFullWidthButton
          style={{ marginTop: MARGIN.base }}
          onClick={this.handleDocumentUploadPress}
        >
          Please upload your policy documentation for a profile
        </BigRedFullWidthButton>
      )
    }

    return null
  }

  render() {
    const policy = this.getPolicy() || {}
    const expiryDate = moment(policy.expiryDate)
    const drivers = policy.drivers || []
    const isHandset = this.props.isHandset

    return (
      <div
        style={{
          overflow: 'scroll',
        }}
      >
        <Container>
          <div
            style={{
              backgroundColor: isHandset ? CREAM : WHITE,
              paddingLeft: isHandset ? 0 : MARGIN.large,
              paddingRight: isHandset ? 0 : MARGIN.large,
              paddingBottom: isHandset ? 0 : MARGIN.large,
              marginTop: isHandset ? 0 : MARGIN.large,
            }}
          >
            {!isHandset && <Header>Overview</Header>}
            <PolicyDetailsPanel
              className="Panel"
              style={{
                position: 'relative',
                marginTop: isHandset ? MARGIN.base : 0,
              }}
            >
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
                <DaysRemainingTitle>DAYS REMAINING</DaysRemainingTitle>
                <DaysRemainingValue>
                  {expiryDate.diff(moment(), 'days')}
                </DaysRemainingValue>
              </DaysRemainingContainer>
            </PolicyDetailsPanel>
            <div>
              <Header>Policy</Header>
              <Row title="level of cover">
                {policy.levelOfCover
                  ? LEVEL_OF_COVER[policy.levelOfCover]
                  : '-'}
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
          </div>
          {this.renderPolicyDocumentsButton()}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policies: selectPolicies(state),
  initialised: state.policies.initialised,
  isHandset: selectors.isHandset(state),
})

export default connect(mapStateToProps)(withRouter(PolicyDetailsScreen))
