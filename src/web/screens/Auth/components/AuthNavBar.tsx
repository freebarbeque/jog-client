import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { push, PushAction } from 'react-router-redux';
import { Cross, Logo } from 'src/web/images';
import {Action, bindActionCreators} from "redux";

interface IAuthNavBar {
  push: PushAction;
}

class AuthNavBar extends React.Component<IAuthNavBar, {}> {
  public render() {
    const rightButton = (
      <FlatButton
        onClick={() => {
          this.props.push('/auth');
        }}
      >
        <Cross />
      </FlatButton>
    )

    return (
      <AppBar
        className="NavBar"
        title={<Logo style={{ marginTop: 21 }} />}
        iconElementLeft={<div />}
        iconElementRight={rightButton}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  push,
}, dispatch);

export default connect(null, mapDispatchToProps)(AuthNavBar);
