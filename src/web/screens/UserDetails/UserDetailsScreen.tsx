import * as React from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import CarDetailsForm from './components/Car/CarDetailsForm';
import DriverDetailsForm from './components/Driver/DriverDetailsForm';
import AddressStepsComponent from './components/Address/AddressSteps';
const AddressSteps = AddressStepsComponent as any; // todo: find out why it doesn't work as it should
import Header from './components/Header';
import Footer from 'src/web/components/Footer';
import {CREAM} from 'src/common/constants/palette';
import {connect} from 'react-redux';
import {IWebReduxState} from '~/web/interfaces/store';
import {getSteps, getCurrentStep} from 'src/web/selectors/page';
import {submitDriver} from 'src/common/actions/userDetails';
import {Action, ActionCreator, bindActionCreators} from 'redux';

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

        return (
            <div className={this.props.className}>
                <Header
                    steps={this.props.steps}
                    activeStep={this.props.currentStep}
                    onBack={() => this.props.history.goBack()}
                    title={title}
                />
                <Content>
                    <Switch>
                        <Route path={`${this.props.match.url}/motor/:motorId(\\d+)/car`} component={CarDetailsForm}/>
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
    padding: 35px 150px 25px;
`;

const mapStateToProps = (state: IWebReduxState) => ({
    steps: getSteps(state),
    currentStep: getCurrentStep(state),
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    submitDriver,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledUserDetailsScreen);