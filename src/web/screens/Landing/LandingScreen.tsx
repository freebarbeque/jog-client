import * as React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Description from './components/Description';
import {CREAM} from 'src/common/constants/palette';
import Divider from './components/Divider';
import BenefitsSection from './components/BenefitsSection';

const LandingScreen = (props: any) => (
  <div className={props.className}>
    <Header />
    <Description />
    <Content>
      <Divider />
      <BenefitsSection />
    </Content>
  </div>
);

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 50px 45px;
`;

const StyledLandingScreen = styled(LandingScreen)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
`;

export default StyledLandingScreen;