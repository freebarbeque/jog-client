import * as React from 'react';
import styled from 'styled-components';
import {equals} from 'ramda';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import DaysLeft from './DaysLeft';
import Notification from 'src/web/components/Notification';
import OffersPlaceholder from './OffersPlaceholder';
import OverviewDialog from './OverviewDialog';
import EditOverviewForm from './EditOverviewForm';
import {IWebReduxState} from '~/web/interfaces/store';
import {IMotorPolicyWithDaysLeft, IPatchPolicyFormValues} from 'src/common/interfaces/policies';
import {getCurrentMotorPolicy, getEditOverviewFormInitialValues} from 'src/common/selectors/policies';
import {styledComponentWithProps} from 'src/common/utils/types';
import {openModal, closeModal} from 'src/web/actions/page';
import {isModalOpen} from 'src/web/selectors/page';
import {patchPolicy} from 'src/common/actions/policies';
import {EDIT_OVERVIEW_MODAL} from 'src/common/constants/policies';
import {injectSaga} from 'src/common/utils/saga';
import {patchPolicyFlow} from 'src/common/sagas/policies';

interface IPolicyOverviewProps {
  className?: string;
  motorId: string;
  motorPolicy: IMotorPolicyWithDaysLeft;
  openModal: any;
  closeModal: any;
  isEditModalOpen: boolean;
  editOverviewInitialValues: IPatchPolicyFormValues;
  patchPolicy: any;
}

interface IContentProps {
  height?: number;
};

class PolicyOverview extends React.Component<IPolicyOverviewProps, {}> {

  componentWillMount() {
    injectSaga(patchPolicyFlow)
  }

  handleSubmit = (values: IPatchPolicyFormValues) => {
    if (equals(values, this.props.editOverviewInitialValues)) {
      this.props.closeModal(EDIT_OVERVIEW_MODAL);
    } else {
      console.log(this.props.motorId);
      this.props.patchPolicy(values, this.props.motorId);
    }
  };

  render() {
    const {
      className,
      motorPolicy,
      openModal,
      closeModal,
      isEditModalOpen,
      editOverviewInitialValues,
      motorId,
    } = this.props;

    return (
      <div className={className}>
        {motorPolicy ? (
          <Wrapper>
            <LeftSectionsContainer>
              <PolicySection title="Overview" withEditButton onEditButtonClick={() => openModal(EDIT_OVERVIEW_MODAL)}>
                <Content>
                  <DaysLeft days={motorPolicy.daysLeft} />
                  <OverviewField title="Expires" value={motorPolicy.expiry} />
                  <OverviewField title="Vehicle" />
                  <OverviewField title="Policy No." value={motorPolicy.policy_number}/>
                  <OverviewField title="Insurance Co." value={motorPolicy.insuranceCompanyName} />
                  <OverviewField title="Annual Cost" value={motorPolicy.annualCost} />
                </Content>
              </PolicySection>
              <PolicySection title="Policy">
                <Content height={200}>
                  <OverviewField title="Level of Cover" value={motorPolicy.level_of_cover} />
                  <OverviewField title="Excess" gray value={motorPolicy.excess} underline="dashed" />
                  <OverviewField title="Drivers" underline="dashed" />
                  <OverviewField title="No Claims Bonus" value={motorPolicy.no_claims_bonus} />
                </Content>
              </PolicySection>
            </LeftSectionsContainer>
            <RightSectionsContainer>
              <PolicySection title="Offers">
                <OffersPlaceholder />
              </PolicySection>
            </RightSectionsContainer>
            <Notification notificationText="Upload your policy documentation for complete profile" />
            <OverviewDialog
              open={isEditModalOpen}
              onRequestClose={() => closeModal(EDIT_OVERVIEW_MODAL)}
            >
              <PolicySection
                title="Overview"
                withCloseButton
                onCloseButtonClick={() => closeModal(EDIT_OVERVIEW_MODAL)}
              >
                <EditOverviewForm
                  initialValues={editOverviewInitialValues}
                  motorId={motorId}
                  onSubmit={this.handleSubmit}
                />
              </PolicySection>
            </OverviewDialog>
          </Wrapper>
        ) : (
          <Redirect to="/app/dashboard/motor" />
        )}
      </div>
    )
  }
}

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

const editOverviewModal = isModalOpen(EDIT_OVERVIEW_MODAL);

const mapStateToProps = (state: IWebReduxState, props: IPolicyOverviewProps) => ({
  motorPolicy: getCurrentMotorPolicy(props.motorId)(state),
  isEditModalOpen: editOverviewModal(state),
  editOverviewInitialValues: getEditOverviewFormInitialValues(props.motorId)(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  openModal,
  closeModal,
  patchPolicy,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledPolicyOverview);