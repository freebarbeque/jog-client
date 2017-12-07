import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getDriversDataSource} from '~/common/selectors/userDetils';
import {IDataSource} from '~/common/interfaces/dataSource';
import {Add} from 'src/web/images';
import DriverDetailsForm from './DriverDetailsForm';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {changeSelectedDriver} from 'src/common/actions/userDetails';

interface IDriversPage {
    className?: string;
    driversDataSource: IDataSource[];
    changeSelectedDriver: ActionCreator<Action>;
}

class DriversPage extends React.Component<IDriversPage, {drivers: any, addDriverClicked: boolean}> {

    constructor(props: IDriversPage) {
        super();
        this.state = {drivers: props.driversDataSource.map(() => {
            return false;
        }), addDriverClicked: false}
    }

    handleDriverClick = (indexButton) => {
        this.state.drivers.map((driver, index) => {
            if  (indexButton === index) {
                this.setState(Object.assign({}, this.state, this.state.drivers[index] = !this.state.drivers[index]));
            }
        });
        this.props.driversDataSource.map((driver, index) => {
            if  (indexButton === index) {
                this.props.changeSelectedDriver(driver.id)
            }
        })
    };

    handleAddDriverClick = () => {
        this.setState({addDriverClicked: !this.state.addDriverClicked})
    };

    render() {
        console.log(this.props.driversDataSource);
        return (
            <div className={this.props.className}>
                {this.props.driversDataSource.length > 0 ?
                    <FormSection>
                        <Container>
                            <Title>
                                List of drivers
                            </Title>
                            <DriversContainer>
                                {this.props.driversDataSource.map((driver, index) => (
                                    <Drivers key={index}>
                                        <Driver onClick={() => this.handleDriverClick(index)} value={driver.name}>
                                            {driver.name}
                                        </Driver>
                                        <DriverDetailsForm active={this.state.drivers[index]}/>
                                    </Drivers>
                                ))}
                            </DriversContainer>
                        </Container>
                        <Container>
                            <DriverDetailsForm active={this.state.addDriverClicked}/>
                        </Container>
                            <ButtonWrapper>
                                <Circle onClick={this.handleAddDriverClick}>
                                    <Add/>
                                </Circle>
                                <Text>Add one more driver</Text>
                            </ButtonWrapper>
                    </FormSection> :
                    <DriverDetailsForm/>
                }
            </div>
        )
    }
}

const Text = styled.div`
    margin-left: 25px;
    color: #131733;
    font-size: 24px;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
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

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 0 50px;
  flex: 1;
`;

const mapStateToProps = (state: IReduxState) => ({
    driversDataSource: getDriversDataSource(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    changeSelectedDriver,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledDriversPage) as any;