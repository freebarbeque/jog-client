import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { MARGIN } from '../../../common/constants/style'
import { selectInitialisedPolicies } from '../../../common/store/policies/selectors'
import {
  IMotorPolicy,
  IMotorPolicyMap,
  IReduxState,
} from '../../../common/types'
import Container from '../../components/Container'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount'
import { max } from '../../media'
import AddPolicyScreen from '../AddPolicyScreen'
import GetStartedScreen from '../GetStartedScreen'
import PolicyScreen from '../PolicyScreen'
import AddMotorPolicyCard from './AddMotorPolicyCard'
import MotorPolicyCard from './MotorPolicyCard'

interface IProps extends DispatchProp<any> {
  policies: IMotorPolicyMap
}

// language=SCSS prefix=dummy{ suffix=}
const PoliciesList = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${MARGIN.large}px;

  .PolicyCard {
    margin-left: ${MARGIN.base}px;
    margin-right: ${MARGIN.base}px;
    width: 310px;
  }

  ${max.largeHandset`
    .PolicyCard {
      width: 100%;
    }
  `};
`

class PoliciesTab extends React.Component<IProps> {
  public render() {
    return (
      <Switch>
        <Route
          path="/app/tabs/policies"
          exact
          render={() => {
            const numPolicies = _.values(this.props.policies).length
            return numPolicies ? this.renderPolicies() : this.renderNoPolicies()
          }}
        />
        <Route
          path="/app/tabs/policies/addPolicy"
          component={AddPolicyScreen}
        />
        <Route path="/app/tabs/policies/:policyId" component={PolicyScreen} />
      </Switch>
    )
  }

  private handlePolicyPress(p: IMotorPolicy) {
    this.props.dispatch(push(`/app/tabs/policies/${p.id}`))
  }

  private handleAddPolicyPress = () => {
    this.props.dispatch(push('/app/tabs/policies/addPolicy'))
  }

  private renderNoPolicies() {
    return <GetStartedScreen />
  }

  private renderPolicies() {
    const policies = this.props.policies

    return (
      <Container>
        <ScrollToTopOnMount />
        <PoliciesList className="PoliciesList">
          {_.values(policies).map((p, idx) =>
            <MotorPolicyCard
              key={p.id}
              policy={p}
              index={idx}
              onPress={() => this.handlePolicyPress(p)}
            />,
          )}
          <AddMotorPolicyCard onPress={this.handleAddPolicyPress} />
        </PoliciesList>
      </Container>
    )
  }
}

const mapStateToProps = (state: IReduxState) => {
  return {
    policies: selectInitialisedPolicies(state),
  }
}

export default connect(mapStateToProps)(PoliciesTab)
