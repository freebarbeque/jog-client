import * as React from 'react';
import {push} from 'react-router-redux';
import styled from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import RoundedButton from 'src/web/components/RoundedButton';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import {resendEmail} from 'src/common/actions/auth';
import {Action, ActionCreator, bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from 'src/common/selectors/auth';

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`;

interface IEmailVerificationScreenProps {
    resendEmail: ActionCreator<Action>;
    isLoading: boolean;
}

class EmailVerificationScreen extends React.Component<IEmailVerificationScreenProps, {}> {
    public render() {
        return (
            <FlexCenteredContainer style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}>
                <div>
                    <Title>Email Verification</Title>

                    <Description>
                        We just sent you a verification email. Click the link to activate
                        your account
                    </Description>
                    <RoundedButton
                        style={{
                            marginTop: MARGIN.xxl,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        label="Resend"
                        onClick={() => this.props.resendEmail()}
                        disabled={this.props.isLoading}
                    />
                </div>
            </FlexCenteredContainer>
        )
    }
}

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state)
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    resendEmail,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationScreen);
