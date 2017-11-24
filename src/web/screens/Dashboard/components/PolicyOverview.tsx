import * as React from 'react';
import styled from 'styled-components';
import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import DaysLeft from './DaysLeft';

interface IPolicyOverviewProps {
  className?: string;
}

const PolicyOverview: React.StatelessComponent<IPolicyOverviewProps> = (props) => (
  <div className={props.className}>
    <PolicySection title="Overview" withEditButton>
      <Content>
        <DaysLeft days={122} />
        <OverviewField title="Expires" value="22 Jun 2017" />
        <OverviewField title="Vehicle" />
        <OverviewField title="Policy No." value="0128454"/>
        <OverviewField title="Insurance Co." value="Admiral" />
        <OverviewField title="Cost per month" value="€38" />
      </Content>
    </PolicySection>
  </div>
);

const StyledPolicyOverview = styled(PolicyOverview)`
  display: flex;
  align-self: stretch;
  flex: 1 0 auto;
  padding: 52px 42px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  flex: 0 0 290px;
  padding: 25px 0 20px 20px;
  align-content: space-between;
  
  & > ${OverviewField}, ${DaysLeft} {
    flex: 0 0 calc(50% - 20px);
    margin: 0 20px 0 0;
  }
`;

export default StyledPolicyOverview;