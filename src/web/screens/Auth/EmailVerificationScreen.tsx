import * as React from 'react';
import {push} from 'react-router-redux';
import styled from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import RoundedButton from 'src/web/components/RoundedButton';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import {IUser} from "~/common/interfaces/user";

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

class EmailVerificationScreen extends React.Component<{}, {}> {
    private handleResendClick() {
        console.log('Will resend email')
    }

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
                        onClick={this.handleResendClick}
                    />
                </div>
            </FlexCenteredContainer>
        )
    }
}

export default EmailVerificationScreen;
