import * as React from 'react';
import {push} from 'react-router-redux';
import styled from 'styled-components';
import {MARGIN} from 'src/common/constants/style';
import FlexCenteredContainer from 'src/web/components/FlexCenteredContainer';
import RoundedButton from 'src/web/components/RoundedButton';
import Title from 'src/web/components/Title';
import {NAVIGATION_BAR_HEIGHT} from 'src/web/constants/style';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`;

interface IVerifiedScreenProps {
    push: ActionCreator<Action>;
}

class VerifiedScreen extends React.Component<IVerifiedScreenProps, {}> {
    public render() {
        return (
            <FlexCenteredContainer style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}>
                <div>
                    <Title>Email Verification</Title>

                    <Description>
                        Your email was verified successfully. You will now be redirected to the application...
                    </Description>
                    <RoundedButton
                        style={{
                            marginTop: MARGIN.xxl,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        label="Sign In"
                        onClick={() => this.props.push('/auth/login')}
                    />
                </div>
            </FlexCenteredContainer>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(VerifiedScreen);