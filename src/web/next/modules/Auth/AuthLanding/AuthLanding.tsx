import * as React from 'react';
import { connect } from 'react-redux';

import { join } from 'src/web/next/store/auth/actions';

// OldAuthLandingPage should be refactored to normal code
import OldAuthLandingPage from 'src/web/screens/Landing/LandingScreen';

class AuthLanding extends React.PureComponent<any, any> {
    handleJoin = values => {
        const { name, ...rest } = values;

        const fullName = name.split(' ');

        const user = {
            first_name: fullName[0],
            last_name: fullName[1],
            ...rest,
        };

        return this.props.initJoin(user);
    };

    render() {
        return <OldAuthLandingPage join={this.handleJoin} />;
    }
}

const mapDispatchToProps = dispatch => ({
    initJoin: data => dispatch(join(data)),
});

export default connect(null, mapDispatchToProps)(AuthLanding);
