import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import authToken from 'src/web/next/utils/authToken';

class PublicRoute extends React.Component<any, any> {
    static defaultProps = {
        forceLoggedOut: false,
    };

    renderContent = props => {
        const { forceLoggedOut, component: Component, loggedIn } = this.props;

        if (forceLoggedOut && loggedIn) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
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

export default connect(mapStateToProps)(PublicRoute) as any;
