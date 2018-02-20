import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { equals } from 'ramda';

import { injectSaga } from 'src/common/utils/saga';
import { patchPolicyFlow, removePolicyFlow } from 'src/common/sagas/policies';
import {
    IMotorPolicy,
    IMotorPolicyWithDaysLeft,
    IPatchPolicyFormValues,
} from 'src/common/interfaces/policies';
import { styledComponentWithProps } from 'src/common/utils/types';
import { IWebReduxState } from '~/web/interfaces/store';
import {
    getCurrentMotorPolicyWithDaysLeft,
    getEditOverviewFormInitialValues,
    getEditPolicyFormInitialValues,
    getMotorPolicyIncompleteKeys,
    getIsLoading,
} from 'src/common/selectors/policies';
import {
    getDocumentsForPolicy,
    getIsLoading as getDocumentsLoadingState,
} from 'src/common/selectors/documents';
import { isModalOpen } from 'src/web/selectors/page';
import { openModal, closeModal } from 'src/web/actions/page';
import { patchPolicy, removePolicy } from 'src/common/actions/policies';

import {
    EDIT_POLICY_OVERVIEW_FORM,
    EDIT_POLICY_POLICY_FORM,
    EDIT_OVERVIEW_MODAL,
    EDIT_POLICY_MODAL,
} from 'src/common/constants/policies';

import {
    Content,
    Wrapper,
    LeftSectionsContainer,
    RightSectionsContainer,
    ButtonModalWrapper,
    ButtonModal,
    TextModal,
} from './PolicyOverview.styled';
import Notification from 'src/web/components/Notification';
import RoundedButton from 'src/web/common/components/controls/RoundedButton';
import OffersPlaceholder from './OffersPlaceholder';
import OverviewDialog from './OverviewDialog';
import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import EditOverviewForm from './EditOverviewForm';
import EditPolicyForm from './EditPolicyForm';
import DaysLeft from './DaysLeft';

ReactModal.setAppElement('#root');

const StyledModal = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.1)',
    },
    content: {
        position: 'absolute',
        top: '35%',
        left: '30%',
        right: '30%',
        bottom: '35%',
        border: '1px solid #ccc',
        background: '#fff',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
    },
};

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
    removePolicy: any;
    isLoading: boolean;
    incompleteKeys: [keyof IMotorPolicy];
    currentPolicyDocuments: any;
    isDocumentsLoading: boolean;
}

interface IContentState {
    showNotification: boolean;
    showRemoveModal: boolean;
    currentOpenedModal: string | null;
}

class PolicyOverview extends React.Component<
    IPolicyOverviewProps,
    IContentState
> {
    constructor() {
        super();
        this.state = {
            showNotification: true,
            showRemoveModal: false,
            currentOpenedModal: null,
        };
    }

    componentWillMount() {
        injectSaga(patchPolicyFlow, this.props.motorId);
        injectSaga(removePolicyFlow, this.props.motorId);
    }

    handleEditOverviewSubmit = (values: IPatchPolicyFormValues) => {
        if (equals(values, this.props.editOverviewInitialValues)) {
            this.props.closeModal(EDIT_OVERVIEW_MODAL);
        } else {
            this.props.patchPolicy(
                values,
                this.props.motorId,
                EDIT_OVERVIEW_MODAL,
                EDIT_POLICY_OVERVIEW_FORM
            );
        }
    };

    handleEditPolicySubmit = (values: IPatchPolicyFormValues) => {
        if (equals(values, this.props.editPolicyInitialValues)) {
            this.props.closeModal(EDIT_POLICY_MODAL);
        } else {
            this.props.patchPolicy(
                values,
                this.props.motorId,
                EDIT_POLICY_MODAL,
                EDIT_POLICY_POLICY_FORM
            );
        }
    };

    // handles opening/closing of Remove Policy modal confirmation
    handleRemoveModalOpen = index => {
        this.setState({ showRemoveModal: true });
    };
    handleRemoveModalClose = () => {
        this.setState({ showRemoveModal: false });
    };

    handleRemovePolicy = () => {
        const { motorId } = this.props;
        this.props.removePolicy(motorId);
        this.handleRemoveModalClose();
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
                onRequestClose={() =>
                    this.handleCloseEditModal(EDIT_OVERVIEW_MODAL)
                }
            >
                <PolicySection
                    title="Overview"
                    withCloseButton
                    onCloseButtonClick={() =>
                        this.handleCloseEditModal(EDIT_OVERVIEW_MODAL)
                    }
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
                onRequestClose={() =>
                    this.handleCloseEditModal(EDIT_POLICY_MODAL)
                }
            >
                <PolicySection
                    title="Policy"
                    withCloseButton
                    onCloseButtonClick={() =>
                        this.handleCloseEditModal(EDIT_POLICY_MODAL)
                    }
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

    renderRemoveConfirmModal = () => (
        <ReactModal
            isOpen={this.state.showRemoveModal}
            contentLabel="Remove policy"
            style={StyledModal}
        >
            <TextModal>
                Are you sure that you want to remove this policy?
            </TextModal>
            <ButtonModalWrapper>
                <ButtonModal onClick={this.handleRemoveModalClose}>
                    No
                </ButtonModal>
                <ButtonModal onClick={this.handleRemovePolicy}>Yes</ButtonModal>
            </ButtonModalWrapper>
        </ReactModal>
    );

    handleOpenEditModal = modalId => {
        this.setState({ currentOpenedModal: modalId });
        this.props.openModal(modalId);
    };

    handleCloseEditModal = modalId => {
        this.setState({ currentOpenedModal: null });
        this.props.closeModal(modalId);
    };

    render() {
        const {
            className,
            motorPolicy,
            closeModal,
            isEditModalOpen,
        } = this.props;
        const { currentOpenedModal } = this.state;

        const vehicleData =
            motorPolicy.vehicle_manufacturer_name &&
            motorPolicy.vehicle_model_name
                ? `${motorPolicy.vehicle_manufacturer_name} ${
                      motorPolicy.vehicle_model_name
                  }`
                : undefined;

        return (
            <div className={className}>
                {motorPolicy ? (
                    <Wrapper>
                        <LeftSectionsContainer>
                            <PolicySection
                                title="Overview"
                                withEditButton
                                onEditButtonClick={() =>
                                    this.handleOpenEditModal(
                                        EDIT_OVERVIEW_MODAL
                                    )
                                }
                            >
                                <Content>
                                    <DaysLeft days={motorPolicy.daysLeft} />
                                    <OverviewField
                                        title="Expires"
                                        value={motorPolicy.expiry}
                                    />
                                    <OverviewField
                                        title="Vehicle"
                                        value={vehicleData}
                                    />
                                    <OverviewField
                                        title="Policy No."
                                        value={motorPolicy.policy_number}
                                    />
                                    <OverviewField
                                        title="Insurance Co."
                                        value={motorPolicy.insuranceCompanyName}
                                    />
                                    <OverviewField
                                        title="Annual Cost"
                                        value={motorPolicy.annualCost}
                                    />
                                </Content>
                            </PolicySection>

                            <PolicySection
                                title="Policy"
                                withEditButton
                                onEditButtonClick={() =>
                                    this.handleOpenEditModal(EDIT_POLICY_MODAL)
                                }
                            >
                                <Content>
                                    <OverviewField
                                        title="Level of Cover"
                                        value={motorPolicy.level_of_cover}
                                    />
                                    <OverviewField
                                        title="Excess"
                                        value={motorPolicy.excess || 0}
                                        underline="dashed"
                                    />
                                    <OverviewField
                                        title="Driver(s) name(s)"
                                        value={motorPolicy.driver_name}
                                        underline="dashed"
                                    />
                                    <OverviewField
                                        title="No Claims Bonus"
                                        value={motorPolicy.no_claims_bonus}
                                    />
                                </Content>
                            </PolicySection>
                        </LeftSectionsContainer>

                        {this.renderRemoveConfirmModal()}

                        <RightSectionsContainer>
                            <PolicySection title="Offers">
                                <OffersPlaceholder />
                            </PolicySection>
                            <PolicySection title="Actions">
                                <RoundedButton
                                    label="Remove this policy"
                                    type="button"
                                    onClick={
                                        !isEditModalOpen
                                            ? this.handleRemoveModalOpen
                                            : () => {}
                                    }
                                />
                            </PolicySection>
                        </RightSectionsContainer>
                        {this.state.showNotification &&
                            !this.props.isDocumentsLoading &&
                            !this.props.currentPolicyDocuments.length && (
                                <Notification
                                    notificationText="Upload your policy documentation for complete profile"
                                    onCloseButtonClick={() =>
                                        this.setState({
                                            showNotification: false,
                                        })
                                    }
                                />
                            )}

                        {isEditModalOpen &&
                            currentOpenedModal === EDIT_OVERVIEW_MODAL &&
                            this.renderEditOverviewDialog()}
                        {isEditModalOpen &&
                            currentOpenedModal === EDIT_POLICY_MODAL &&
                            this.renderEditPolicyDialog()}
                    </Wrapper>
                ) : (
                    <Redirect to="/app/dashboard/motor" />
                )}
            </div>
        );
    }
}

const StyledPolicyOverview = styled(PolicyOverview)`
    display: flex;
    flex: 1 0 auto;
    align-self: stretch;
    width: 70%;
    min-width: 720px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
`;

const editOverviewModal = isModalOpen(EDIT_OVERVIEW_MODAL);
const editPolicyModal = isModalOpen(EDIT_POLICY_MODAL);

const mapStateToProps = (
    state: IWebReduxState,
    props: IPolicyOverviewProps
) => ({
    motorPolicy: getCurrentMotorPolicyWithDaysLeft(state, props),
    isEditModalOpen: editOverviewModal(state) || editPolicyModal(state),
    editOverviewInitialValues: getEditOverviewFormInitialValues(state, props),
    editPolicyInitialValues: getEditPolicyFormInitialValues(state, props),
    isLoading: getIsLoading(state),
    incompleteKeys: getMotorPolicyIncompleteKeys(state, props),
    currentPolicyDocuments: getDocumentsForPolicy(state, props.motorId),
    isDocumentsLoading: getDocumentsLoadingState(state),
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            openModal,
            closeModal,
            patchPolicy,
            removePolicy,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(
    StyledPolicyOverview
);
