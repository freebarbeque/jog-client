import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import styled from 'styled-components';
import AuthNavBar from './components/AuthNavBar';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import PasswordResetScreen from './PasswordResetScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import ConfirmPasswordResetScreen from './ConfirmPasswordResetScreen';
import LandingScreen from 'src/web/screens/Landing/LandingScreen';
import LogoutScreen from 'src/web/screens/Auth/LogoutScreen';

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

class AuthScreen extends React.Component<{}, {}> {
    public render() {
        return (
            <Container>
                <Route path="/auth(/?.+)" component={AuthNavBar}/>
                <Route path="/auth" exact component={LandingScreen}/>
                <Route path="/auth/login" component={LoginScreen}/>
                <Route path="/auth/logout" component={LogoutScreen}/>
                <Route path="/auth/register" component={RegisterScreen}/>
                <Route path="/auth/verify" component={EmailVerificationScreen}/>
                <Route path="/auth/forgotPassword" component={PasswordResetScreen}/>
                <Route path="/auth/confirmForgotPassword" component={ConfirmPasswordResetScreen}/>
            </Container>
        )
    }
}

export default AuthScreen;
