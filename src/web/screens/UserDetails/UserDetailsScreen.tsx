import * as React from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import CarDetailsForm from './components/CarDetailsForm';
import Header from './components/Header';
import Footer from 'src/web/components/Footer';
import {CREAM} from 'src/common/constants/palette';

interface IUserDetailsScreenProps {
    className?: string;
    location: {
        pathname: string;
    };
    match: {
        url: string;
    }
}

interface IUserDetailsScreenState {
    currentStep: number;
}

class UserDetailsScreen extends React.Component<IUserDetailsScreenProps, IUserDetailsScreenState> {
    constructor() {
        super();
        this.state = {currentStep: 1};
    }

    render() {
        const splitPath = this.props.location.pathname.split('/');
        let title = '';
        switch (splitPath[splitPath.length - 1]) {
            case 'holder': {
                title = 'Driver details';
                break;
            }
            default: {
                title = ''
            }
        }

        return (
            <div className={this.props.className}>
                <Header
                    steps={[1, 2, 3, 4]}
                    activeStep={this.state.currentStep}
                    onBack={() => console.log('Will navigate back')}
                    title={title}
                />
                <Content>
                    <Switch>
                        <Route path={`${this.props.match.url}/motor/:motorId(\\d+)/car`} component={CarDetailsForm} />
                    </Switch>
                </Content>
                <Footer />
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

export default StyledUserDetailsScreen;