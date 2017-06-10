import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import { Logo, Cross } from './images'
import type { Dispatch } from '../../common/types'

type AuthNavBarProps = {
  dispatch: Dispatch,
}

export default class AuthNavBar extends React.Component {
  props: AuthNavBarProps

  render() {
    const rightButton = (
      <FlatButton containerElement={<Link to="/auth" />}>
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
