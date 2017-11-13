import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import styled from 'styled-components';
import {IReduxState} from '~/common/interfaces/store';
import {IUser} from '~/common/interfaces/user';
import AuthHome from './AuthHomeScreen';
import AuthNavBar from './components/AuthNavBar';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import PasswordResetScreen from './PasswordResetScreen';

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

interface IAuthScreenProps extends DispatchProp<any> {
    user: IUser | null;
}

class AuthScreen extends React.Component<IAuthScreenProps, {}> {
    public render() {
        return (
            <Container>
                <Route path="/auth(/?.+)" component={AuthNavBar}/>
                <Route path="/auth" exact component={AuthHome}/>
                <Route path="/auth/login" component={LoginScreen}/>
                <Route path="/auth/register" component={RegisterScreen} />
                <Route path="/auth/forgotPassword" component={PasswordResetScreen} />
            </Container>
        )
    }
}

const mapStateToProps = (state: IReduxState) => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, null)(AuthScreen)
