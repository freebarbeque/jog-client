import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Logo } from '../components/images/index'
import { DARK_GRAY, PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import FlexCentredContainer from '../components/FlexCentredContainer'

// language=SCSS prefix=dummy{ suffix=}
const Divider = styled.div`
  width: 25px;
  height: 4px;
  background-color: ${PINK};
  margin: ${MARGIN.large} auto;
`

// language=SCSS prefix=dummy{ suffix=}
const TopHeadline = styled.p`
  font-size: 36px;
  font-weight: 600;
`

// language=SCSS prefix=dummy{ suffix=}
const BottomHeadline = styled.p`
  font-size: 16px;
`

// language=SCSS prefix=dummy{ suffix=}
const Menu = styled.ul`
  a {
    color: ${DARK_GRAY};
    font-weight: 700;
    font-size: 16px;

    &:visited, &:hover, &:active {
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
          <Logo scale={1.5} />
          <TopHeadline>
            your<br />
            insurance<br />
            memory<br />
          </TopHeadline>
          <Divider />
          <BottomHeadline>
            store your policies<br />
            minimise your premiums<br />
          </BottomHeadline>
          <Menu>
            <li>
              <Link to="/auth/login">
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="auth/register">
                REGISTER
              </Link>
            </li>
          </Menu>
        </div>
      </FlexCentredContainer>
    )
  }
}

export default AuthHomeScreen
