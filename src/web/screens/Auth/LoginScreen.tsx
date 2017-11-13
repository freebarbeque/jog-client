import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {Link} from 'react-router-dom'
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';

interface ILoginProps extends DispatchProp<any> {
    loginError: string | null
    loading: boolean
    errors: {
        [key: string]: string
    }
}

class LoginScreen extends React.Component<ILoginProps, {}> {
    public render() {
        return (
            <FlexCenteredContainer
                className="LoginScreen"
                style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}
            >
                <div className="LoginScreen__Inner">

                </div>
            </FlexCenteredContainer>
        )
    }
}

export default LoginScreen;
