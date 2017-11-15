import * as React from 'react';
import {Link} from 'react-router-dom';
import FlexCentredContainer from 'src/web/components/FlexCentredContainer';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import PasswordResetForm from 'src/web/components/Forms/PasswordResetForm';
import {IPasswordResetFormValues} from '~/common/interfaces/user';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {requestPasswordChange} from 'src/common/actions/auth';

interface IPasswordResetScreenProps {
    requestPasswordChange: ActionCreator<Action>;
}

class PasswordResetScreen extends React.Component<IPasswordResetScreenProps, {}> {
    public render() {
        return (
            <FlexCentredContainer style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}>
                <Title>Password Reset</Title>
                <PasswordResetForm onSubmit={(values: IPasswordResetFormValues) => this.props.requestPasswordChange(values.email)} />
            </FlexCentredContainer>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    requestPasswordChange,
}, dispatch);

export default connect(null, mapDispatchToProps)(PasswordResetScreen);