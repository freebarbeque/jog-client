import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import authToken from 'src/web/next/utils/authToken';

class HomePage extends React.Component<any, any> {
    static defaultProps = {
        loggedIn: false,
        hasPolicies: false,
    };

    render() {
        const { loggedIn, hasPolicies } = this.props;

        if (loggedIn && hasPolicies) {
            return <Redirect to="/app/dashboard" />;
        }

        if (loggedIn && !hasPolicies) {
            return <Redirect to="/app/get_started" />;
        }

        return <Redirect to="/auth" />
    }
}

const mapStateToProps = state => ({
    loggedIn: !!state.nextStore.auth.currentUser && !!state.nextStore.auth.currentUser.confirmed,
    hasPolicies: !!state.nextStore.auth.currentUser && state.nextStore.auth.currentUser.has_policies,
});

export default connect(mapStateToProps)(HomePage) as any;
