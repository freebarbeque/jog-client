import * as React from 'react';
import styled from 'styled-components';
import {Route, withRouter} from 'react-router-dom';
import {CREAM} from 'src/common/constants/palette';
import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';
import BackgroundTitle from './components/BackgroundTitle';
import NavigationBar from './components/NavigationBar';
import PolicyContent from './components/PolicyContent';

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