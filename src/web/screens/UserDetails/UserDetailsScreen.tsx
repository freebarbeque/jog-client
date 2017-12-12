import * as React from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import CarDetailsSteps from './components/Car/CarDetailsSteps';
import DriverDetailsForm from './components/Driver/DriverDetailsForm';
import AddressSteps from './components/Address/AddressSteps';
import Header from './components/Header';
import Footer from 'src/web/components/Footer';
import {CREAM} from 'src/common/constants/palette';
import {connect} from 'react-redux';
import {IWebReduxState} from '~/web/interfaces/store';
import {getSteps, getCurrentStep} from 'src/web/selectors/page';
import {submitDriver, submitVehicle} from 'src/common/actions/userDetails';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

interface IUserDetailsScreenProps {
    className?: string;
    history: any;
    location: {
        pathname: string;
    };
    match: {
        url: string;
    },
    currentStep: number;
    steps: number[];
    submitDriver: ActionCreator<Action>;
    submitVehicle: ActionCreator<Action>;
    push: ActionCreator<Action>;
}

class UserDetailsScreen extends React.Component<IUserDetailsScreenProps, {}> {
    render() {
        const splitPath = this.props.location.pathname.split('/');
        let title = '';
        switch (splitPath[splitPath.length - 1]) {
            case 'holder': {
                title = 'Driver details';
                break;
            }

            case 'car': {
                title = 'Vehicle details';
                break;
            }
            default: {
                title = ''
            }
        }
        console.log(this.props);
        return (
            <div className={this.props.className}>
                <Header
                    steps={this.props.steps}
                    activeStep={this.props.currentStep}
                    onBack={() => {
                        const splitLocation = this.props.location.pathname.split('/');
                        this.props.push(`/app/dashboard/motor/${splitLocation[splitLocation.length - 2]}/quote`);
                    }}
                    title={title}
                />
                <Content>
                    <Switch>
                        <Route
                            path={`${this.props.match.url}/motor/:motorId(\\d+)/car`}
                            render={(routerProps: any) => <CarDetailsSteps
                                currentStep={this.props.currentStep}
                                motorId={routerProps.match.params.motorId}
                            />}
                        />
                        <Route
                            path={`${this.props.match.url}/motor/:motorId(\\d+)/holder`}
                            render={(routerProps: any) => <DriverDetailsForm
                                onSubmit={(values: any) => this.props.submitDriver(values)}
                                motorId={routerProps.match.params.motorId}
                            />}
                        />
                        <Route
                            path={`${this.props.match.url}/motor/:motorId(\\d+)/address`}
                            render={(routerProps: any) => <AddressSteps
                                currentStep={this.props.currentStep}
                                motorId={routerProps.match.params.motorId}
                            />}
                        />
                    </Switch>
                </Content>
                <Footer/>
            </div>
        )
    }
}

const StyledUserDetailsScreen = styled(UserDetailsScreen)`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    align-self: stretch;
`;

const Content = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-self: stretch;
    background-color: ${CREAM};
    align-items: center;
    padding: 80px 40px;
`;

const mapStateToProps = (state: IWebReduxState) => ({
    steps: getSteps(state),
    currentStep: getCurrentStep(state),
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    submitDriver,
    submitVehicle,
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledUserDetailsScreen);