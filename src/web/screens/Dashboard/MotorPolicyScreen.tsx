import * as React from 'react';
import styled from 'styled-components';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';
import CurrentPolicy from './components/CurrentPolicy';
import PolicyTabs from './components/PolicyTabs';
import DocumentsPolicy from './components/DocumentsPolicy';
import QuotePolicy from './components/QuotePolicy';
import PolicyOverview from './components/PolicyOverview';

import {CREAM} from 'src/common/constants/palette';

interface IMotorPolicyScreen {
  className?: string;
  history?: any;
  match?: any;
}

const MotorPolicyScreen: React.StatelessComponent<IMotorPolicyScreen> = (props) => (
  <div className={props.className}>
    <Header />
    <CurrentPolicy
      onBackArrowClick={() => props.history.push('/app/dashboard/motor')}
      insurerAvatar="https://image.flaticon.com/icons/png/512/48/48982.png"
      insurerName="Default insurer"
      policyName="Motor Policy 1"
    />
    <PolicyTabs />
    <Switch>
      <Route exact path={`${props.match.url}/overview`} render={(routerProps) => <PolicyOverview motorId={props.match.params.motorId} {...routerProps} />} />
      <Route exact path={`${props.match.url}/documents`} render={(routerProps: any) => <DocumentsPolicy motorId={props.match.params.motorId} {...routerProps} />} />
      <Route exact path={`${props.match.url}/quote`} render={(routerProps: any) => <QuotePolicy motorId={props.match.params.motorId} {...routerProps} />} />
      <Redirect to={`${props.match.url}/overview`} />
    </Switch>
    <Footer />
  </div>
);

const StyledMotorPolicyScreen = styled(MotorPolicyScreen)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
  overflow-y: scroll;
`;

export default StyledMotorPolicyScreen;