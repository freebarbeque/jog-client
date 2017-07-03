import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DARK_GRAY } from '../../common/constants/palette'
import FlexCentredContainer from '../components/FlexCentredContainer'
import Jumbotron from '../components/Jumbotron'

// language=SCSS prefix=dummy{ suffix=}
const Menu = styled.ul`
  a {
    color: ${DARK_GRAY};
    font-weight: 700;
    font-size: 16px;

    &:visited,
    &:hover,
    &:active {
      color: ${DARK_GRAY};
    }
  }

  list-style: none;
  padding-left: 0;
`

class AuthHomeScreen extends Component {
  render() {
    return (
      <FlexCentredContainer>
        <div>
          <Jumbotron />
          <Menu>
            <li>
              <Link to="/auth/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/auth/register">REGISTER</Link>
            </li>
          </Menu>
        </div>
      </FlexCentredContainer>
    )
  }
}

export default AuthHomeScreen
