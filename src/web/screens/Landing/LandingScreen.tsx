import * as React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Description from './components/Description';
import {CREAM} from 'src/common/constants/palette';

const LandingScreen = (props: any) => (
  <div className={props.className}>
    <Header />
    <Description />
  </div>
);

const StyledLandingScreen = styled(LandingScreen)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: ${CREAM};
`;

export default StyledLandingScreen;