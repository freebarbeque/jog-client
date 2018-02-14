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
import {
    WHITE,
    BLUE,
    PINK,
    DARK_PINK,
    LIGHT_GREEN,
    SHADOW_COLOR,
    FIELD_VALID_COLOR,
    FIELD_DEFAULT_COLOR,
} from 'src/common/constants/palette';

import { Add, DownArrow } from 'src/web/images';
import RoundedButton from 'src/web/common/components/controls/RoundedButton';
import CloseIcon from './components/CloseIcon';
import EditIcon from './components/EditIcon';
import SelectIcon from './components/SelectIcon';
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
            <FormSection>
                <Container>
                    <Title>List of drivers</Title>
                    <DriversContainer>
                        {this.props.drivers.map(this.renderDriversListItem)}
                    </DriversContainer>
                </Container>
                {!showEditForm && (
                    <ButtonWrapper>
                        {addDriverClicked
                            ? this.renderDriverForm(null)
                            : this.renderAddDriverButton()}
                        {!addDriverClicked && this.renderConfirmDriversButton()}
                    </ButtonWrapper>
                )}
            </FormSection>
        );
    };

    renderDriversListItem = (driver, index) => {
        const driverId = driver.id;
        let { driverIndex, selectedDrivers, showEditForm } = this.state;
        const active: boolean = selectedDrivers.includes(driverId);

        return (
            <DriverListItem key={driverId}>
                <DriverWrapper active={active}>
                    <Driver>
                        <Name>
                            {driver.first_name + ' ' + driver.last_name}
                        </Name>
                    </Driver>
                    <DriverActions>
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
                    </DriverActions>
                </DriverWrapper>
                {showEditForm === driverId &&
                    this.renderEditDriver(driver, index)}
            </DriverListItem>
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
            <ContainerBox>
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
            </ContainerBox>
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
            <TextModal>
                Are you sure that you want to remove the driver?
            </TextModal>
            <ButtonModalWrapper>
                <ButtonModal onClick={this.handleDeleteModalClose}>
                    No
                </ButtonModal>
                <ButtonModal
                    onClick={() => this.removeDriver(this.state.driverIndex)}
                >
                    Yes
                </ButtonModal>
            </ButtonModalWrapper>
        </ReactModal>
    );

    renderSpinner = () => <ScaleLoader color={LIGHT_GREEN} loading={true} />;

    // MAIN RENDER

    render() {
        const { isLoading, drivers } = this.props;
        const hasDrivers = drivers && drivers.length > 0;

        return (
            <div className={this.props.className}>
                {isLoading && this.renderSpinner()}
                <ContentWrapper
                    style={{ display: isLoading ? 'none' : 'flex' }}
                >
                    {hasDrivers && this.renderDriversListContent()}
                    {!hasDrivers && this.renderCreateDriverForm()}
                    {this.renderModal()}
                </ContentWrapper>
            </div>
        );
    }
}

// STYLE COMPONENTS

const divWithOnClick = styledComponentWithProps<
    { onClick?: any },
    HTMLDivElement
>(styled.div);
const ActiveDriver = styledComponentWithProps<
    { active: boolean },
    HTMLDivElement
>(styled.div);

const ButtonModalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    & > div:first-child {
        margin-right: 15px;
        background-color: transparent;
        border: 3px solid ${LIGHT_GREEN};
        height: 34px;
    }
`;

const ButtonModal = divWithOnClick`
    height: 40px;
    background-color: ${LIGHT_GREEN};
    box-shadow: 0 4px 4px #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${BLUE};
    display: flex;
    flex: 1;
    cursor: pointer;
`;

const TextModal = styled.div`
    color: ${BLUE};
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    height: 60%;
    font-size: 18px;
`;

const ContentWrapper = styled.div`
    display: block;
    width: 100%;
    max-width: 660px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Name = styled.div`
    display: flex;
    color: ${BLUE};
    align-items: center;
    justify-content: center;
`;

const StyledDownArrow = styled(DownArrow)`
    transform: rotate(180deg);
    margin-top: 10px;
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 3px solid ${LIGHT_GREEN};
    padding: 10px;
    cursor: pointer;
`;

const Text = styled.div`
    margin-left: 15px;
    color: ${BLUE};
    font-size: 24px;
`;

const Circle = styled.div`
    width: 45px;
    height: 45px;
    background-color: ${LIGHT_GREEN};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    justify-content: space-between;
    align-items: center;

    button {
        flex: 1 1 auto;
    }

    button + button {
        margin: 0 0 0 10px;
    }
`;

const Title = styled.div`
    font-size: 20px;
    line-height: 22px;
    color: ${BLUE};
    margin-bottom: 25px;
    align-self: center;
`;

const DriversContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
`;

const DriverListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex: 1;
`;

const DriverWrapper = ActiveDriver`
    display: flex;
    flex: 1;
    height: 40px;
    margin-bottom: 8px;
    padding: 0 16px;
    background-color: ${(props: { active: boolean }) =>
        props.active ? FIELD_VALID_COLOR : FIELD_DEFAULT_COLOR};
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 ${SHADOW_COLOR};
`;

const Driver = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${BLUE};
    font-size: 18px;
    flex: 1;
`;

const DriverActions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 0 auto;
    margin-left: auto;
`;

const StyledDriversPage = styled(DriversPage)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    align-self: stretch;
    background-color: #fff;
    padding: 40px 0 35px;
    margin: 0 auto;
    width: 100%;
    max-width: 980px;
    box-shadow: 0 2px 4px ${SHADOW_COLOR};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
    margin-bottom: 30px;
`;
const ContainerBox = styled.div`
    display: block;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    padding: 0 50px;
    flex: 1;
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
