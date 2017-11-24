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
import {styledComponentWithProps} from 'src/common/utils/types';

interface IPolicyOverviewProps {
  className?: string;
  motorId: string;
  motorPolicy: IMotorPolicyWithDaysLeft;
}

interface IContentProps {
  height?: number;
};

const PolicyOverview: React.StatelessComponent<IPolicyOverviewProps> = (props) => (
  <div className={props.className}>
    {props.motorPolicy ? (
      <SectionsContainer>
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
        <PolicySection title="Policy">
          <Content height={200}>
            <OverviewField title="Level of Cover" value={props.motorPolicy.level_of_cover} />
            <OverviewField title="Excess" gray value={props.motorPolicy.excess} underline="dashed" />
            <OverviewField title="Drivers" underline="dashed" />
            <OverviewField title="No Claims Bonus" value={props.motorPolicy.no_claims_bonus} />
          </Content>
        </PolicySection>
      </SectionsContainer>
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

const div = styledComponentWithProps<IContentProps, HTMLDivElement>(styled.div);

const Content = div`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  flex: 0 0 ${props => props.height || 290}px;
  padding: 25px 0 20px 20px;
  align-content: space-between;
  
  & > ${OverviewField}, ${DaysLeft} {
    flex: 0 0 calc(50% - 20px);
    margin: 0 20px 0 0;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-self: stretch;
  & > ${PolicySection}:first-child {
    margin-bottom: 35px;
  }
`;

const mapStateToProps = (state: IReduxState, props: IPolicyOverviewProps) => ({
  motorPolicy: getCurrentMotorPolicy(props.motorId)(state),
});

export default connect(mapStateToProps, null)(StyledPolicyOverview);