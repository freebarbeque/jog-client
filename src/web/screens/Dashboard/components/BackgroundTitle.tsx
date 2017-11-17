import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {DashboardShape, CircleDashboardCar} from 'src/web/images';

const BackgroundTitle = (props: any) => (
  <div className={props.className}>
    <DashboardShape />
    <Text>
      Dashboard
    </Text>
    <CircleDashboardCar />
  </div>
);

const StyledBackgroundTitle = styled(BackgroundTitle)`
  display: flex;
  position: relative;
  align-self: stretch;
  flex-basis: 185px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${BLUE};
  overflow: hidden;
  padding-left: 43px;
  & > .dashboard-shape-img {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  
  & > .circle-dashboard-car-img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    right: 75px;
  }
`;

const Text = styled.div`
  margin-top: 50px;
  font-size: 40px;
  line-height: 42px;
  font-weight: 400;
`;

export default StyledBackgroundTitle;