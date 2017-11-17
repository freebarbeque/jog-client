import * as React from 'react';
import styled from 'styled-components';
import {CREAM} from 'src/common/constants/palette';
import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';
import BackgroundTitle from './components/BackgroundTitle';

interface IDashboardProps {
  className?: string;
}

class Dashboard extends React.Component<IDashboardProps, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <Header />
        <BackgroundTitle />
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

export default StyledDashboard;