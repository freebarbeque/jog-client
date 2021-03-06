import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { logout } from '../../common/store/auth/actions'
import { Cross, Logo } from './images'

class AuthNavBar extends React.Component<DispatchProp<any>> {
  public render() {
    const rightButton = (
      <FlatButton
        onClick={() => {
          this.props.dispatch(logout())
          this.props.dispatch(push('/auth'))
        }}
      >
        <Cross />
      </FlatButton>
    )

    return (
      <AppBar
        className="NavBar"
        title={<Logo style={{ marginTop: 21 }} />}
        onTitleTouchTap={() => {
          // TODO: Go home
        }}
        iconElementLeft={<div />}
        iconElementRight={rightButton}
      />
    )
  }
}

const ConnectedAuthNavBar: React.ComponentClass<{}> = connect()(AuthNavBar)
export default ConnectedAuthNavBar
