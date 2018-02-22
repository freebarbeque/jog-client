import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import authToken from 'src/web/next/utils/authToken';

class PrivateRoute extends React.Component<any, any> {
    renderContent = props => {
        const { component: Component, loggedIn } = this.props;

        if (!loggedIn) {
            return (
                <Redirect
                    to={{
                        pathname: '/auth',
                        state: { from: props.location },
                    }}
                />
            )
        }

        return <Component {...props} />
    };

    render() {
        const { component, ...rest } = this.props;
        return <Route {...rest} render={this.renderContent} />
    }
}

const mapStateToProps = state => ({
    loggedIn: !!state.nextStore.auth.currentUser && !!state.nextStore.auth.currentUser.confirmed,
});

export default connect(mapStateToProps)(PrivateRoute) as any;
