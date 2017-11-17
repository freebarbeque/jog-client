import * as React from 'react';
import styled from 'styled-components';
import PolicyButton from './PolicyButton';
import {PolicyCar, PolicyHome, PolicyTravel, PolicyWarranties} from 'src/web/images';

const PolicyContent = (props: any) => (
  <div className={props.className}>
    <PolicyButton icon={<PolicyCar />} title="Motor" />
    <PolicyButton icon={<PolicyHome />} title="Home & Contents" />
    <PolicyButton icon={<PolicyTravel />} title="Travel" />
    <PolicyButton icon={<PolicyWarranties />} title="Warranties" />
  </div>
);

const StyledPolicyContent = styled(PolicyContent)`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  flex: 1;
  padding: 56px 22px 146px 42px;
  & ${PolicyButton} {
    margin-right: 20px;
    margin-bottom: 5px;
  }
`;

export default StyledPolicyContent;