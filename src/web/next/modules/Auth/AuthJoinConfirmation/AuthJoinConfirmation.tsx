import * as React from 'react';
import { connect } from 'react-redux';

import AuthLayout from '../AuthLayout';

class AuthJoinConfirmation extends React.PureComponent<any, any> {
    render() {
        const { currentUser } = this.props;

        return (
            <AuthLayout fluid title="Email Verification">
                {
                    `Hello, ${currentUser.first_name} ${currentUser.last_name}!
                    We just sent you a verification email on ${currentUser.email}.
                    Please click the link to activate your account...`
                }
            </AuthLayout>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.nextStore.auth.currentUser,
});

export default connect(mapStateToProps)(AuthJoinConfirmation)
