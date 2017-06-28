import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

import { Logo } from './images'
import { logout } from '../../common/store/auth/actions'
import { max } from '../media'
import { PINK } from '../../common/constants/palette'

// language=SCSS prefix=dummy{ suffix=}
const NavBarRight = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  // Counter the padding in the AppBar which seems impossible to override
  margin-top: -4px;
  
  .Menu {
    ${max.largeTablet`
      display: none !important;
    `}
  }
 
  // Override FlatButton colours.
  button, a {
    color: white !important;
    
    &.SignOutButton {
      color: #cdcdcd !important;
    }
  }
  
  a {
    margin-top: 3px !important;
    
    &.active {
      color: ${PINK} !important;
    }
  }
`

class NavBar extends React.Component {
  render() {
    const iconElementRight = (
      <NavBarRight className="NavBarRight">
        <div className="Menu">
          <FlatButton
            label="Policies"
            containerElement={<NavLink to="/app/tabs/policies" exact={false} />}
          />
          <FlatButton
            label="Settings"
            containerElement={<NavLink to="/app/tabs/settings" exact={false} />}
          />
        </div>
        <FlatButton
          label="Sign Out"
          className="SignOutButton"
          onClick={() => this.props.dispatch(logout())}
        />
      </NavBarRight>
    )

    return (
      <AppBar
        className="NavBar"
        title={<Logo style={{ marginTop: 21 }} />}
        onTitleTouchTap={() => {
          // TODO: Go home
        }}
        iconElementLeft={<div />}
        iconElementRight={iconElementRight}
      />
    )
  }
}

const connectOptions = {
  pure: false, // Required to always re-render the component and update the active NavLink
}

export default connect(null, null, null, connectOptions)(withRouter(NavBar))
