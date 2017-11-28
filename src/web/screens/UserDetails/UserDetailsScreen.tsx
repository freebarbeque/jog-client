import * as React from 'react';
import Header from './components/Header';

interface IUserDetailsScreenProps {
    location: {
        pathname: string;
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
            <div>
                <Header
                    steps={[1, 2, 3, 4]}
                    activeStep={this.state.currentStep}
                    onBack={() => console.log('Will navigate back')}
                    title={title}
                />
            </div>
        )
    }
}

export default UserDetailsScreen