import * as React from 'react'
import {Link} from 'react-router-dom'
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import SignInForm from '../../components/Forms/SignInForm';
import Title from 'src/web/components/Title';
import {signIn} from 'src/common/actions/auth';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IUserCreds} from "~/common/interfaces/user";

interface ILoginScreenProps {
    signIn: ActionCreator<Action>;
}

class LoginScreen extends React.Component<ILoginScreenProps, {}> {
    public render() {
        return (
            <FlexCenteredContainer
                className="LoginScreen"
                style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}
            >
                <div className="LoginScreen__Inner">
                    <Title>Sign In</Title>
                    <SignInForm onSubmit={(values: IUserCreds) => this.props.signIn(values)}/>
                </div>
            </FlexCenteredContainer>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    signIn,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginScreen);
