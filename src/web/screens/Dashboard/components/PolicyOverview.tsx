import * as React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import DaysLeft from './DaysLeft';
import {IReduxState} from 'src/common/interfaces/store';
import {IMotorPolicyWithDaysLeft} from 'src/common/interfaces/policies';
import {getCurrentMotorPolicy} from 'src/common/selectors/policies';

interface IPolicyOverviewProps {
  className?: string;
  motorId: string;
  motorPolicy: IMotorPolicyWithDaysLeft;
}

const PolicyOverview: React.StatelessComponent<IPolicyOverviewProps> = (props) => (
  <div className={props.className}>
    {props.motorPolicy ? (
      <PolicySection title="Overview" withEditButton>
        <Content>
          <DaysLeft days={props.motorPolicy.daysLeft} />
          <OverviewField title="Expires" value={props.motorPolicy.expiry} />
          <OverviewField title="Vehicle" />
          <OverviewField title="Policy No." value={props.motorPolicy.policy_number}/>
          <OverviewField title="Insurance Co." value={props.motorPolicy.insuranceCompanyName} />
          <OverviewField title="Cost per month" value={props.motorPolicy.costPerMonth} />
        </Content>
      </PolicySection>
    ) : (
      <Redirect to="/app/dashboard/motor" />
    )}
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

const mapStateToProps = (state: IReduxState, props: IPolicyOverviewProps) => ({
  motorPolicy: getCurrentMotorPolicy(props.motorId)(state),
});

export default connect(mapStateToProps, null)(StyledPolicyOverview);