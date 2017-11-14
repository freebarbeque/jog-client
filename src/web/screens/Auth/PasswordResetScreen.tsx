import * as React from 'react';
import {Link} from 'react-router-dom';
import FlexCentredContainer from 'src/web/components/FlexCentredContainer';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import PasswordResetForm from 'src/web/components/Forms/PasswordResetForm';

class PasswordResetScreen extends React.Component<{}, {}> {
    public render() {
        return (
            <FlexCentredContainer style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}>
                <Title>Password Reset</Title>
                <PasswordResetForm onSubmit={(values: any) => console.log(values)} />
            </FlexCentredContainer>
        )
    }
}

export default PasswordResetScreen;