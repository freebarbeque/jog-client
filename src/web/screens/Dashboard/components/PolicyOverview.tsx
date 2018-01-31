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
import {IWebReduxState} from '~/web/interfaces/store';
import {IMotorPolicy, IMotorPolicyWithDaysLeft, IPatchPolicyFormValues} from 'src/common/interfaces/policies';
import {
    getCurrentMotorPolicyWithDaysLeft,
    getEditOverviewFormInitialValues,
    getEditPolicyFormInitialValues,
    getMotorPolicyIncompleteKeys
} from 'src/common/selectors/policies';
import {styledComponentWithProps} from 'src/common/utils/types';
import {openModal, closeModal} from 'src/web/actions/page';
import {isModalOpen} from 'src/web/selectors/page';
import {patchPolicy} from 'src/common/actions/policies';
import {EDIT_POLICY_OVERVIEW_FORM, EDIT_POLICY_POLICY_FORM, EDIT_OVERVIEW_MODAL, EDIT_POLICY_MODAL} from 'src/common/constants/policies';
import {injectSaga} from 'src/common/utils/saga';
import {patchPolicyFlow} from 'src/common/sagas/policies';
import {getIsLoading} from 'src/common/selectors/policies';
import EditOverviewForm from './EditOverviewForm';
import EditPolicyForm from './EditPolicyForm';

interface IPolicyOverviewProps {
    className?: string;
    motorId: string;
    motorPolicy: IMotorPolicyWithDaysLeft;
    openModal: any;
    closeModal: any;
    isEditModalOpen: boolean;
    editOverviewInitialValues: IPatchPolicyFormValues;
    editPolicyInitialValues: IPatchPolicyFormValues;
    patchPolicy: any;
    isLoading: boolean;
    incompleteKeys: [keyof IMotorPolicy];
}

interface IContentProps {
    height?: number;
};

interface IContentState {
    showNotification: boolean;
    currentOpenedModal: string | null
}

class PolicyOverview extends React.Component<IPolicyOverviewProps, IContentState> {

    constructor() {
        super();
        this.state = {
            showNotification: true,
            currentOpenedModal: null,
        };
    }

    componentWillMount() {
        injectSaga(patchPolicyFlow)
    }

    handleEditOverviewSubmit = (values: IPatchPolicyFormValues) => {
        if (equals(values, this.props.editOverviewInitialValues)) {
            this.props.closeModal(EDIT_OVERVIEW_MODAL);
        } else {
            this.props.patchPolicy(values, this.props.motorId, EDIT_OVERVIEW_MODAL, EDIT_POLICY_OVERVIEW_FORM);
        }
    };

    handleEditPolicySubmit = (values: IPatchPolicyFormValues) => {
        if (equals(values, this.props.editPolicyInitialValues)) {
            this.props.closeModal(EDIT_POLICY_MODAL);
        } else {
            this.props.patchPolicy(values, this.props.motorId, EDIT_POLICY_MODAL, EDIT_POLICY_POLICY_FORM);
        }
    };

    renderEditOverviewDialog = () => {
        const {
            closeModal,
            isEditModalOpen,
            editOverviewInitialValues,
            motorId,
            isLoading,
        } = this.props;

        return (
            <OverviewDialog
                open={isEditModalOpen}
                onRequestClose={() => this.handleCloseEditModal(EDIT_OVERVIEW_MODAL)}
            >
                <PolicySection
                    title="Overview"
                    withCloseButton
                    onCloseButtonClick={() => this.handleCloseEditModal(EDIT_OVERVIEW_MODAL)}
                >
                    <EditOverviewForm
                        initialValues={editOverviewInitialValues}
                        motorId={motorId}
                        onSubmit={this.handleEditOverviewSubmit}
                        submitDisabled={isLoading}
                    />
                </PolicySection>
            </OverviewDialog>
        );
    };

    renderEditPolicyDialog = () => {
        const {
            closeModal,
            isEditModalOpen,
            editPolicyInitialValues,
            motorId,
            isLoading,
        } = this.props;

        return (
            <OverviewDialog
                open={isEditModalOpen}
                onRequestClose={() => this.handleCloseEditModal(EDIT_POLICY_MODAL)}
            >
                <PolicySection
                    title="Policy"
                    withCloseButton
                    onCloseButtonClick={() => this.handleCloseEditModal(EDIT_POLICY_MODAL)}
                >
                    <EditPolicyForm
                      initialValues={editPolicyInitialValues}
                      motorId={motorId}
                      onSubmit={this.handleEditPolicySubmit}
                      submitDisabled={isLoading}
                    />
                </PolicySection>
            </OverviewDialog>
        );

    };

    handleOpenEditModal = modalId => {
        this.setState({currentOpenedModal: modalId});
        this.props.openModal(modalId);
    };

    handleCloseEditModal = modalId => {
        this.setState({currentOpenedModal: null});
        this.props.closeModal(modalId);
    }

    render() {
        const {
            className,
            motorPolicy,
            closeModal,
            isEditModalOpen,
        } = this.props;
        const { currentOpenedModal } = this.state;

        const vehicleData = (motorPolicy.vehicle_manufacturer_name && motorPolicy.vehicle_model_name)
          ? `${motorPolicy.vehicle_manufacturer_name} ${motorPolicy.vehicle_model_name}`
          : undefined;

        return (
            <div className={className}>
                {motorPolicy ? (
                    <Wrapper>
                        <LeftSectionsContainer>
                            <PolicySection
                                title="Overview"
                                withEditButton
                                onEditButtonClick={() => this.handleOpenEditModal(EDIT_OVERVIEW_MODAL)}
                            >
                                <Content>
                                    <DaysLeft days={motorPolicy.daysLeft}/>
                                    <OverviewField title="Expires" value={motorPolicy.expiry}/>
                                    <OverviewField title="Vehicle" value={vehicleData}/>
                                    <OverviewField title="Policy No." value={motorPolicy.policy_number}/>
                                    <OverviewField title="Insurance Co." value={motorPolicy.insuranceCompanyName}/>
                                    <OverviewField title="Annual Cost" value={motorPolicy.annualCost}/>
                                </Content>
                            </PolicySection>

                            <PolicySection
                                title="Policy"
                                withEditButton
                                onEditButtonClick={() => this.handleOpenEditModal(EDIT_POLICY_MODAL)}
                            >
                                <Content height={200}>
                                    <OverviewField title="Level of Cover" value={motorPolicy.level_of_cover}/>
                                    <OverviewField title="Excess" gray value={motorPolicy.excess} underline="dashed"/>
                                    <OverviewField title="Driver(s) name(s)" value={motorPolicy.driver_name} underline="dashed"/>
                                    <OverviewField title="No Claims Bonus" value={motorPolicy.no_claims_bonus}/>
                                </Content>
                            </PolicySection>
                        </LeftSectionsContainer>

                        <RightSectionsContainer>
                            <PolicySection title="Offers">
                                <OffersPlaceholder/>
                            </PolicySection>
                        </RightSectionsContainer>
                        {
                            this.state.showNotification &&
                            this.props.incompleteKeys.length &&
                            < Notification
                                notificationText="Upload your policy documentation for complete profile"
                                onCloseButtonClick={() => this.setState({showNotification: false})}
                            />
                        }

                        {isEditModalOpen && currentOpenedModal === EDIT_OVERVIEW_MODAL && this.renderEditOverviewDialog()}
                        {isEditModalOpen && currentOpenedModal === EDIT_POLICY_MODAL && this.renderEditPolicyDialog()}
                    </Wrapper>
                ) : (
                    <Redirect to="/app/dashboard/motor"/>
                )}
            </div>
        )
    }
}

const StyledPolicyOverview = styled(PolicyOverview)`
  display: flex;
  align-self: stretch;
  width: 70%;
  margin: 0px auto;
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
  justify-content: center;
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
const editPolicyModal = isModalOpen(EDIT_POLICY_MODAL);

const mapStateToProps = (state: IWebReduxState, props: IPolicyOverviewProps) => ({
    motorPolicy: getCurrentMotorPolicyWithDaysLeft(state, props),
    isEditModalOpen: editOverviewModal(state) || editPolicyModal(state),
    editOverviewInitialValues: getEditOverviewFormInitialValues(state, props),
    editPolicyInitialValues: getEditPolicyFormInitialValues(state, props),
    isLoading: getIsLoading(state),
    incompleteKeys: getMotorPolicyIncompleteKeys(state, props),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    openModal,
    closeModal,
    patchPolicy,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledPolicyOverview);
