import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import styled from 'styled-components';
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

class AuthScreen extends React.Component<{}, {}> {
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

export default AuthScreen;
