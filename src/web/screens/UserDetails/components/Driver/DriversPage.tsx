import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {connect} from 'react-redux';
import {Add, DownArrow} from 'src/web/images';
import DriverDetailsForm from './DriverDetailsForm';
import {injectSaga} from '~/common/utils/saga';
import {driverFlow} from '~/common/sagas/userDetails/driver';
import {IReduxState} from '~/common/interfaces/store';
import {mapDriverToFormValues} from '~/common/utils/userDetails';
import * as spinners from 'react-spinners';
import {getDriversList, getIsLoading} from '~/common/selectors/userDetils';
import {bindActionCreators} from 'redux';
import {updateDriver, removeDriver} from '~/common/actions/userDetails';
import CloseIcon from './components/CloseIcon';
import * as ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const {ScaleLoader}: { ScaleLoader: any } = spinners;

const StyledModal = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        background   : 'rgba(0, 0, 0, 0.1)',
    },
    content : {
        position                   : 'absolute',
        top                        : '35%',
        left                       : '35%',
        right                      : '35%',
        bottom                     : '35%',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px',
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',

    }
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
}

interface IDriversPageState {
    drivers: any;
    addDriverClicked: boolean;
    showModal: boolean;
}

class DriversPage extends React.Component<IDriversPage, IDriversPageState> {

    componentWillMount() {
        injectSaga(driverFlow, this.props.motorId);
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.drivers !== nextProps.drivers) {
            this.setState({addDriverClicked: false, drivers: nextProps.drivers.map(() => {
                return false;
            })})
        }
    }

    constructor(props: IDriversPage) {
        super();
        this.state = {drivers: props.drivers && props.drivers.map(() => {
            return false;
        }), addDriverClicked: false, showModal: false}
    }

    handleDriverClick = (indexButton) => {
        this.state.drivers.map((driver, index) => {
            if  (indexButton === index) {
                this.setState(Object.assign({}, this.state, this.state.drivers[index] = !this.state.drivers[index]));
            }
        });
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleAddDriverClick = () => {
        this.setState({addDriverClicked: !this.state.addDriverClicked})
    };

    updateDriver = (event, index) => {
        event.preventDefault();
        this.props.updateDriver(index);
    };

    removeDriver = (index) => {
        this.props.removeDriver(index);
    };

    renderDrivers = () => (
        <ContentWrapper>
            {this.props.drivers && this.props.drivers.length > 0 ?
                <FormSection>
                    <Container>
                        <Title>
                            List of drivers
                        </Title>
                        <DriversContainer>
                            {this.props.drivers.map((driver, index) => (
                                <Drivers key={index}>
                                    <DriverWrapper>
                                        <Driver onClick={() => this.handleDriverClick(index)}>
                                            <Name>{driver.first_name + ' ' + driver.last_name}</Name>
                                            {this.state.drivers[index] ? <StyledDownArrow/> : <DownArrow/>}
                                        </Driver>
                                        <CloseIcon onClick={this.handleOpenModal}/>
                                    </DriverWrapper>
                                    <ReactModal
                                        isOpen={this.state.showModal}
                                        contentLabel="Minimal Modal Example"
                                        style={StyledModal}
                                    >
                                        <TextModal>Are you sure that you want to remove the driver?</TextModal>
                                        <ButtonModalWrapper>
                                            <ButtonModal onClick={this.handleCloseModal}>No</ButtonModal>
                                            <ButtonModal>Yes</ButtonModal>
                                        </ButtonModalWrapper>
                                    </ReactModal>
                                    <DriverDetailsForm
                                        active={this.state.drivers[index]}
                                        form={'driver' + index}
                                        motorId={this.props.motorId}
                                        initialValues={this.props.drivers && mapDriverToFormValues(this.props.drivers[index])}
                                        buttonText={'Update Driver'}
                                        handleSubmit={(event) => this.updateDriver(event, index)}
                                    />
                                </Drivers>
                            ))}
                        </DriversContainer>
                    </Container>
                    <ContainerBox>
                        <DriverDetailsForm
                            active={this.state.addDriverClicked}
                            form={'driverAdd'}
                            onSubmit={this.props.onSubmit}
                            motorId={this.props.motorId}
                            buttonText={'Create Driver'}
                        />
                    </ContainerBox>
                    <ButtonWrapper>
                        <Button onClick={this.handleAddDriverClick}>
                            {this.state.addDriverClicked === false ?
                                <Wrapper>
                                    <Circle>
                                        <Add/>
                                    </Circle>
                                    <Text>Add one more driver</Text>
                                </Wrapper> : <Text>Hide new driver form</Text>
                            }
                        </Button>
                    </ButtonWrapper>
                </FormSection> :
                <FormSection>
                    <Container>
                        <DriverDetailsForm
                            active={true}
                            form={'driverAdd'}
                            onSubmit={this.props.onSubmit}
                            motorId={this.props.motorId}
                            buttonText={'Create Driver'}
                        />
                    </Container>
                </FormSection>
            }
        </ContentWrapper>
    );

    renderSpinner = () => (
        <ScaleLoader
            color={'#50e3c2'}
            loading={true}
        />
    );

    render() {
        return (
            <div className={this.props.className}>
                {this.props.isLoading ? this.renderSpinner() : this.renderDrivers()}
            </div>
        )
    }
}

const DriverWrapper = styled.div`
    display: flex;
    align-self: stretch;
    flex: 1;
    position: relative;
`;

const ButtonModalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    & > div:first-child {
        margin-right: 15px;
    }
`;

const ButtonModal = styled.div`
    height: 40px;
    background-color: #50e3c2;
    box-shadow: 0 4px 4px #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #131733;
    display: flex;
    flex: 1;
    cursor: pointer;
`;

const TextModal = styled.div`
    color: #131733;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    height: 60%;
    font-size: 18px;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-self: stretch;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Name = styled.div`
    display: flex;
    align-self: stretch;
    color: ${BLUE};
    align-items: center;
    justify-content: center;
    flex: 0.98;
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
    border: 3px solid #50e3c2;
    padding: 10px;
    cursor: pointer;
`;

const Text = styled.div`
    margin-left: 15px;
    color: #131733;
    font-size: 24px;
`;

const Circle = styled.div`
  width: 45px;
  height: 45px;
  background-color: #50e3c2;
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
    justify-content: flex-end;
    align-items: center;
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

const Drivers = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
`;

const Driver = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: ${BLUE};
    height: 40px;
    background-color: #50e3c2;
    box-shadow: 0 4px 4px #ddd;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    flex: 1;
`;

const StyledDriversPage = styled(DriversPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  align-self: stretch;
  background-color: #FFF;
  padding: 40px 0 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
`;
const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 0 50px;
  flex: 1;
`;

const mapStateToProps = (state: IReduxState) => ({
    drivers: getDriversList(state),
    isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    updateDriver,
    removeDriver,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledDriversPage) as any;