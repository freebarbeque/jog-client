import * as React from 'react';
import { connect } from 'react-redux';

import authToken from 'src/web/next/utils/authToken';
import { retrieveCurrentUser } from 'src/web/next/store/auth/actions';

class AuthVerification extends React.PureComponent<any, any> {
    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const token = params.get('token');

        authToken.set(token);

        this.props.retrieveCurrentUser();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => ({
    retrieveCurrentUser: () => dispatch(retrieveCurrentUser()),
});

export default connect(null, mapDispatchToProps)(AuthVerification);
