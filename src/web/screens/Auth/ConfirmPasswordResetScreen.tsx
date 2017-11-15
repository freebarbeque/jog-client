import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MARGIN } from 'src/common/constants/style';
import HorizontalFlexCenteredContainer from 'src/web/components/HorizontalFlexCenteredContainer';
import RoundedButton from 'src/web/components/RoundedButton';
import Title from 'src/web/components/Title';
import { push, PushAction } from 'react-router-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {logOut} from 'src/common/actions/auth';

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 300;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`;

interface IAuthNavBar {
    push: PushAction;
    logOut: ActionCreator<Action>;
}

class ConfirmPasswordResetScreen extends React.Component<IAuthNavBar, {}> {
  public render() {
    return (
      <HorizontalFlexCenteredContainer>
        <Title>Password Reset</Title>
        <Description>
          We just sent you an email through which you can reset your password.
        </Description>
        <RoundedButton
          style={{
            marginTop: MARGIN.extraLarge,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          label="Back"
          onClick={() => {
              this.props.push('/auth');
              this.props.logOut();
          }}
        />
      </HorizontalFlexCenteredContainer>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
    logOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(ConfirmPasswordResetScreen)
