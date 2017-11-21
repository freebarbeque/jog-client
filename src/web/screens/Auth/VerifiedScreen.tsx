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
import {injectSaga} from '~/common/utils/saga';
import {emailVerifiedFlow} from 'src/common/sagas/auth';
import {IReduxState} from '~/common/interfaces/store';
import {getAuthError} from '~/common/selectors/auth';
import ErrorText from 'src/web/components/Forms/ErrorText';

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 25px;
`;

interface IVerifiedScreenProps {
    push: ActionCreator<Action>;
    error: Error | null;
}

class VerifiedScreen extends React.Component<IVerifiedScreenProps, {}> {
    componentWillMount() {
        injectSaga(emailVerifiedFlow);
    }

    public render() {
        return (
            <FlexCenteredContainer style={{paddingBottom: NAVIGATION_BAR_HEIGHT}}>
                <div>
                    <Title>Email Verification</Title>

                    <Description>
                        Your email was verified successfully. You will now be redirected to the application...
                    </Description>

                    <ErrorContainer>
                        {
                            this.props.error &&
                            <ErrorText>Automatic sign in has failed. Please, click 'Sign In' button below.</ErrorText>
                        }
                    </ErrorContainer>

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

const mapStateToProps = (state: IReduxState) => ({
    error: getAuthError(state),
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedScreen);