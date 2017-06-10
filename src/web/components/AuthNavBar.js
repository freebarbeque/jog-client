import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Logo, Cross } from './images'
import type { Dispatch } from '../../common/types'
import { logout } from '../../common/store/auth/actions'

type AuthNavBarProps = {
  dispatch: Dispatch,
}

class AuthNavBar extends React.Component {
  props: AuthNavBarProps

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

export default connect()(AuthNavBar)
