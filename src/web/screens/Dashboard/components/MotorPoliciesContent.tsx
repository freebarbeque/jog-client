import * as React from 'react';
import styled from 'styled-components';

interface IMotorPoliciesContent {
  className?: string;
  policies?: any[];
}

const MotorPoliciesContent = (props: IMotorPoliciesContent) => (
  <div className={props.className}>

  </div>
);

const StyledMotorPoliciesContent = styled(MotorPoliciesContent)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: stretch;
  padding: 56px 22px 146px 42px;
`;

export default StyledMotorPoliciesContent;