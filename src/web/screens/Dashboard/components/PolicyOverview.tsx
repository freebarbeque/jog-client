import * as React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import DaysLeft from './DaysLeft';
import Notification from 'src/web/components/Notification';
import OffersPlaceholder from './OffersPlaceholder';
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
      <Wrapper>
        <LeftSectionsContainer>
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
        </LeftSectionsContainer>
        <RightSectionsContainer>
          <PolicySection title="Offers">
            <OffersPlaceholder />
          </PolicySection>
        </RightSectionsContainer>
        <Notification notificationText="Upload your policy documentation for complete profile" />
      </Wrapper>
    ) : (
      <Redirect to="/app/dashboard/motor" />
    )}
  </div>
);

const StyledPolicyOverview = styled(PolicyOverview)`
  display: flex;
  align-self: stretch;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const div = styledComponentWithProps<IContentProps, HTMLDivElement>(styled.div);

const Content = div`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  flex: 0 0 ${props => props.height || 290}px;
  padding: 25px 0 20px 20px;
  align-content: space-between;
  box-sizing: border-box;
  
  & > ${OverviewField}, ${DaysLeft} {
    flex: 0 0 calc(50% - 20px);
    margin: 0 20px 0 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-self: stretch;
  flex: 1 0;
  padding: 52px 42px;
`;

const LeftSectionsContainer = styled.div`
  display: flex;
  flex: 0 1 calc(70% - 20px);
  flex-direction: column;
  align-self: stretch;
  margin-right: 20px;
  & > ${PolicySection}:first-child {
    margin-bottom: 35px;
  }
`;

const RightSectionsContainer = styled.div`
  display: flex;
  flex-basis: 30%;
  min-width: 300px;
  flex-direction: column;
  align-self: baseline;
`;

const mapStateToProps = (state: IReduxState, props: IPolicyOverviewProps) => ({
  motorPolicy: getCurrentMotorPolicy(props.motorId)(state),
});

export default connect(mapStateToProps, null)(StyledPolicyOverview);