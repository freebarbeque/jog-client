import * as React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Description from './components/Description';
import {CREAM} from 'src/common/constants/palette';
import Divider from './components/Divider';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';
import SignUpSection from './components/SignUpSection';

const LandingScreen = (props: any) => (
    <div className={props.className}>
        <Header />
        <Description />
        <Content>
            <Divider />
            <BenefitsSection />
        </Content>
        <Footer />
    </div>
);

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 10px 45px 50px 45px;
  flex-shrink: 0;
`;

const StyledLandingScreen = styled(LandingScreen)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
  overflow-y: scroll;
`;

export default StyledLandingScreen;