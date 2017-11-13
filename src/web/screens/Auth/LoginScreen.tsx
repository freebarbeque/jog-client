import * as React from 'react'
import {Link} from 'react-router-dom'
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import SignInForm from '../../../common/components/Forms/SignInForm';
import Title from 'src/web/components/Title';

class LoginScreen extends React.Component<{}, {}> {
    public render() {
        return (
            <FlexCenteredContainer
                className="LoginScreen"
                style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}
            >
                <div className="LoginScreen__Inner">
                    <Title>Sign In</Title>
                    <SignInForm onSubmit={(values: any) => console.log(values)}/>
                </div>
            </FlexCenteredContainer>
        )
    }
}

export default LoginScreen;
