import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';
import CurrentPolicy from './components/CurrentPolicy';
import PolicyTabs from './components/PolicyTabs';
import DocumentsPolicy from './components/DocumentsPolicy';
import QuotePolicy from './components/QuotePolicy';

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
        <Route exact path={`${props.match.url}/overview`} render={() => (<div style={{alignSelf: 'stretch', flex: 1, color: 'black'}}>Overview</div>)}/>
        <Route exact path={`${props.match.url}/documents`} component={DocumentsPolicy} />
        <Route exact path={`${props.match.url}/quote`} component={QuotePolicy} />
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