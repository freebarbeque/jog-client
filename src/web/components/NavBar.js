import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { Logo } from './images'
import { logout } from '../../common/store/auth/actions'

class NavBar extends React.Component {
  render() {
    const rightButton = (
      <FlatButton
        label="Sign Out"
        onClick={() => this.props.dispatch(logout())}
      />
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

export default connect()(NavBar)
