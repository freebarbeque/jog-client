import * as React from 'react'
import { Link } from 'react-router-dom'
import Title from 'src/web/components/Title';
import FlexCentredContainer from 'src/web/components/FlexCentredContainer';
import SignUpForm from 'src/web/components/Forms/SignUpForm';
import { NAVIGATION_BAR_HEIGHT } from 'src/web/constants/style';
import {signUp} from 'src/common/actions/auth';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface IRegisterScreenProps {
    signUp: ActionCreator<Action>;
}

class RegisterScreen extends React.Component<IRegisterScreenProps, {}> {
  public render() {
    return (
      <FlexCentredContainer style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}>
        <div>
          <Title>Register</Title>
          <SignUpForm onSubmit={(values: any) => console.log(values)} />
        </div>
      </FlexCentredContainer>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    signUp,
}, dispatch);

export default connect(null, mapDispatchToProps)(RegisterScreen);
