import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { logout } from '../../common/store/auth/actions'
import { Dispatch } from '../../common/types'
import { Cross, Logo } from './images'

interface Props {}
interface ConnectedProps extends Props, DispatchProp<any> {}

class AuthNavBar extends React.Component<ConnectedProps> {
  render() {
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

const ConnectedAuthNavBar: React.ComponentClass<Props> = connect()(AuthNavBar)
export default ConnectedAuthNavBar
