import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import * as spinners from 'react-spinners';
import * as ReactModal from 'react-modal';
import { findIndex, propEq } from 'ramda';

import { injectSaga } from '~/common/utils/saga';
import { IReduxState } from '~/common/interfaces/store';
import { IDriver } from '~/common/interfaces/drivers';
import { getDriversList, getIsLoading } from '~/common/selectors/userDetils';
import {
    updateDriver,
    removeDriver,
    submitDriverSuccess,
} from '~/common/actions/userDetails';
import { updateDriverOnPolicyQuoteRequest } from '~/common/actions/policyQuoteRequest';
import { mapDriverToFormValues } from '~/common/utils/userDetails';
import { driverFlow } from '~/common/sagas/userDetails/driver';
import { withDeferredSubmit } from 'src/web/common/utils/form/withDeferredSubmit';

import { styledComponentWithProps } from 'src/common/utils/types';
import {
    CREATE_DRIVER_FORM,
    CREATE_ANOTHER_DRIVER_FORM,
    UPDATE_DRIVER_FORM,
} from 'src/common/constants/userDetails';
import { BLUE, SHADOW_COLOR } from 'src/common/constants/palette';

import * as S from './DriversPage.styled';
import { Add, DownArrow } from 'src/web/images';
import RoundedButton from 'src/web/common/components/controls/RoundedButton';
import CloseIcon from 'src/web/common/components/CloseIcon';
import EditIcon from 'src/web/common/components/EditIcon';
import SelectIcon from 'src/web/common/components/SelectIcon';
import DriverDetailsForm from './DriverDetailsForm';

ReactModal.setAppElement('#root');

const { ScaleLoader }: { ScaleLoader: any } = spinners;

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

interface IDriversPage {
    className?: string;
    onSubmit: any;
    motorId: number;
    submitDriver: any;
    drivers: any;
    isLoading: boolean;
    updateDriver: any;
    removeDriver: any;
    submitDriverSuccess: any;
    updateDriverOnPolicyQuoteRequest: any;
    policyQuoteRequest: any;
    location: {
        pathname: string;
    };
    push: any;
}

interface IDriversPageState {
    addDriverClicked: boolean;
    showModal: boolean;
    driverIndex: any;
    currentDriver: any;
    selectedDrivers: number[];
    disableDriversListClick: boolean;
    showEditForm: number | null;
}

class DriversPage extends React.Component<IDriversPage, IDriversPageState> {
    componentWillMount() {
        injectSaga(driverFlow, this.props.motorId);
    }

    constructor() {
        super();
        this.state = {
            addDriverClicked: false,
            showModal: false,
            driverIndex: null,
            currentDriver: null,
            selectedDrivers: [],
            disableDriversListClick: false,
            showEditForm: null,
        };
    }

    componentDidMount() {
        const { policyQuoteRequest } = this.props;
        const driverIds =
            policyQuoteRequest && policyQuoteRequest.driver
                ? policyQuoteRequest.driver.map(item => item.id)
                : [];
        this.setState({ selectedDrivers: driverIds });
    }

    // USER INTERACTIONS

    // handles opening/closing of Delete Driver modal confirmation
    handleDeleteModalOpen = index => {
        this.setState({ showModal: true, driverIndex: index });
    };
    handleDeleteModalClose = () => {
        this.setState({ showModal: false, driverIndex: null });
    };

    handleToggleEditDriver = driverId => {
        const { showEditForm } = this.state;
        const shouldEditDriver = showEditForm === driverId ? null : driverId;

        this.setState({
            driverIndex: null,
            disableDriversListClick: showEditForm ? true : false,
            currentDriver: null,
            addDriverClicked: false,
            showEditForm: shouldEditDriver,
        });
    };

    handleAddNewDriver = () => {
        this.setState({
            driverIndex: null,
            disableDriversListClick: true,
            currentDriver: null,
            addDriverClicked: true,
            showEditForm: null,
        });
        // this.props.submitDriverSuccess(false);
    };

    handleCloseClick = () => {
        this.setState({
            driverIndex: null,
            disableDriversListClick: false,
            addDriverClicked: false,
            showEditForm: null,
            showModal: false,
        });
        // this.props.submitDriverSuccess(true);
    };

    handleSubmit = values => {
        const formName = CREATE_DRIVER_FORM;

        return withDeferredSubmit(this.props.onSubmit, values, formName)
            .then(() => this.handleCloseClick())
            .catch(error => console.error(error));
    };

    gotoQuoteRequest = () => {
        this.props.push(`/app/dashboard/motor/${this.props.motorId}/quote`);
    };

    // ACTION CALLS

    updateDriver = index => {
        return withDeferredSubmit(this.props.updateDriver, index)
            .then(() => this.handleCloseClick())
            .catch(error => console.error(error));
    };

    removeDriver = driverId => {
        let { selectedDrivers } = this.state;
        const { motorId } = this.props;
        const found = selectedDrivers.indexOf(driverId);
        /* tslint:disable-next-line */
        found !== -1 && selectedDrivers.splice(found, 1);
        this.setState({ selectedDrivers: selectedDrivers });

        this.updateDriversOnReduxState(motorId, selectedDrivers);

        this.props.removeDriver(driverId);
        this.handleCloseClick();
    };

    toggleSelectDriver = driverId => {
        let { selectedDrivers } = this.state;
        const { motorId } = this.props;
        const found = selectedDrivers.indexOf(driverId);
        found !== -1
            ? selectedDrivers.splice(found, 1)
            : selectedDrivers.push(driverId);
        this.setState({ selectedDrivers: selectedDrivers });

        this.updateDriversOnReduxState(motorId, selectedDrivers);
    };

    updateDriversOnReduxState = (motorId, selectedDrivers) => {
        const driversObject =
            selectedDrivers && selectedDrivers.length > 0
                ? selectedDrivers.map(item => {
                      return { id: item };
                  })
                : [];

        this.props.submitDriverSuccess(selectedDrivers.length > 0);
        this.props.updateDriverOnPolicyQuoteRequest(motorId, driversObject);
    };

    // RENDER PARTIALS

    renderDriversListContent = () => {
        const { addDriverClicked, showEditForm } = this.state;
        return (
            <S.FormSection>
                <S.Container>
                    <S.Title>List of drivers</S.Title>
                    <S.DriversContainer>
                        {this.props.drivers.map(this.renderDriversListItem)}
                    </S.DriversContainer>
                </S.Container>
                {!showEditForm && (
                    <S.ButtonWrapper>
                        {addDriverClicked
                            ? this.renderDriverForm(null)
                            : this.renderAddDriverButton()}
                        {!addDriverClicked && this.renderConfirmDriversButton()}
                    </S.ButtonWrapper>
                )}
            </S.FormSection>
        );
    };

    renderDriversListItem = (driver, index) => {
        const driverId = driver.id;
        let { driverIndex, selectedDrivers, showEditForm } = this.state;
        const active: boolean = selectedDrivers.includes(driverId);

        return (
            <S.DriverListItem key={driverId}>
                <S.DriverWrapper active={active}>
                    <S.Driver active={active}>
                        <S.Name>
                            {driver.first_name + ' ' + driver.last_name}
                        </S.Name>
                    </S.Driver>
                    <S.DriverActions>
                        <EditIcon
                            onClick={() =>
                                this.handleToggleEditDriver(driverId)
                            }
                        />
                        <SelectIcon
                            onClick={() => this.toggleSelectDriver(driverId)}
                        />
                        <CloseIcon
                            onClick={() => this.handleDeleteModalOpen(driverId)}
                        />
                    </S.DriverActions>
                </S.DriverWrapper>
                {showEditForm === driverId &&
                    this.renderEditDriver(driver, index)}
            </S.DriverListItem>
        );
    };

    renderEditDriver = (driver, index) => (
        <DriverDetailsForm
            active={true}
            form={UPDATE_DRIVER_FORM(index)}
            motorId={this.props.motorId}
            initialValues={mapDriverToFormValues(driver)}
            buttonText={'Update Driver'}
            onSubmit={() => this.updateDriver(index)}
        />
    );

    renderCreateDriverForm = () => this.renderDriverForm(null);

    renderDriverForm = index => {
        const { drivers } = this.props;
        const isEditting = index !== null;
        const buttonText = isEditting ? 'Update Driver' : 'Create Driver';
        const formName = isEditting
            ? UPDATE_DRIVER_FORM(drivers[index].id)
            : CREATE_DRIVER_FORM;
        const initialValues =
            drivers && isEditting
                ? mapDriverToFormValues(drivers[index])
                : undefined;
        const onSubmit =
            drivers && isEditting
                ? () => this.updateDriver(index)
                : this.handleSubmit;

        return (
            <S.ContainerBox>
                <DriverDetailsForm
                    active={true}
                    form={formName}
                    onSubmit={onSubmit}
                    motorId={this.props.motorId}
                    buttonText={buttonText}
                    initialValues={initialValues}
                    cancelVisible={true}
                    closeClick={this.handleCloseClick}
                />
            </S.ContainerBox>
        );
    };

    renderAddDriverButton = () => (
        <RoundedButton
            label="Add one more driver"
            type="button"
            onClick={this.handleAddNewDriver}
        />
    );

    renderConfirmDriversButton = () => (
        <RoundedButton
            label="Confirm"
            type="button"
            onClick={this.gotoQuoteRequest}
        />
    );

    renderModal = () => (
        <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Remove driver"
            style={StyledModal}
        >
            <S.TextModal>
                Are you sure that you want to remove the driver?
            </S.TextModal>
            <S.ButtonModalWrapper>
                <S.ButtonModal onClick={this.handleDeleteModalClose}>
                    No
                </S.ButtonModal>
                <S.ButtonModal
                    onClick={() => this.removeDriver(this.state.driverIndex)}
                >
                    Yes
                </S.ButtonModal>
            </S.ButtonModalWrapper>
        </ReactModal>
    );

    renderSpinner = () => <ScaleLoader color={BLUE} loading={true} />;

    // MAIN RENDER

    render() {
        const { isLoading, drivers } = this.props;
        const hasDrivers = drivers && drivers.length > 0;

        return (
            <div className={this.props.className}>
                {isLoading && this.renderSpinner()}
                <S.ContentWrapper
                    style={{ display: isLoading ? 'none' : 'flex' }}
                >
                    {hasDrivers && this.renderDriversListContent()}
                    {!hasDrivers && this.renderCreateDriverForm()}
                    {this.renderModal()}
                </S.ContentWrapper>
            </div>
        );
    }
}

// STYLE COMPONENTS

const StyledDriversPage = styled(DriversPage)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    align-self: stretch;
    background-color: #fff;
    padding: 40px 0 35px;
    margin: 0 auto;
    width: 60%;
    min-width: 660px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px ${SHADOW_COLOR};
`;

const mapStateToProps = (state: IReduxState, ownProps: any) => ({
    drivers: getDriversList(state),
    isLoading: getIsLoading(state),
    submitDriver: state.userDetails.submitDriver,
    policyQuoteRequest: state.policyQuoteRequest[ownProps.motorId] || {},
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            updateDriver,
            removeDriver,
            submitDriverSuccess,
            updateDriverOnPolicyQuoteRequest,
            push,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(
    StyledDriversPage
) as any;
