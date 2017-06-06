import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import { Logo } from './images'

export default class NavBar extends React.Component {
  render() {
    const rightButton = (
      <FlatButton label="Sign Out" containerElement={<Link to="/auth" />} />
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
