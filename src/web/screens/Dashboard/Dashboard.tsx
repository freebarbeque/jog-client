import * as React from 'react';
import styled from 'styled-components';
import {Route, withRouter} from 'react-router-dom';
import {CREAM} from 'src/common/constants/palette';
import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';
import BackgroundTitle from './components/BackgroundTitle';
import NavigationBar from './components/NavigationBar';
import PolicyContent from './components/PolicyContent';
import MotorPoliciesContent from './components/MotorPoliciesContent';
import AddPolicyContent from './components/AddPolicyContent';
import {policies} from 'src/common/mocks/policy';

interface IDashboardProps {
  className?: string;
  location?: any;
  match?: any;
}

class Dashboard extends React.Component<IDashboardProps, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <Header />
        <BackgroundTitle />
        <NavigationBar location={this.props.location.pathname} />
        <Route exact path={this.props.match.url} component={PolicyContent}/>
        <Route exact path={`${this.props.match.url}/motor`} render={(routerProps: any) => <MotorPoliciesContent {...Object.assign({}, routerProps, {policies})}/>}/>
        <Route path={`${this.props.match.url}/motor/add`} component={AddPolicyContent}/>
        <Footer />
      </div>
    )
  }
}

const StyledDashboard = styled(Dashboard)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
  overflow-y: scroll;
`;

export default withRouter(StyledDashboard);