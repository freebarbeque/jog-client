import * as React from 'react';
import {logOut} from 'src/common/actions/auth';
import {ActionCreator, connect} from "react-redux";
import {Action, bindActionCreators} from "redux";

interface ILogoutScreenProps {
    logOut: ActionCreator<Action>;
}

class LogoutScreen extends React.Component<ILogoutScreenProps, {}> {
    componentWillMount() {
        this.props.logOut();
    }

    render () {
        return <div />
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    logOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(LogoutScreen);