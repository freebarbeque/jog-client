import * as React from 'react';
import Header from './components/Header';

interface IUserDetailsScreenProps {}

interface IUserDetailsScreenState {
    currentStep: number;
}

class UserDetailsScreen extends React.Component<IUserDetailsScreenProps, IUserDetailsScreenState> {
    constructor() {
        super();
        this.state = {currentStep: 1};
    }

    render() {
        return (
            <div>
                <Header steps={[1, 2, 3, 4]} activeStep={this.state.currentStep}/>
            </div>
        )
    }
}

export default UserDetailsScreen