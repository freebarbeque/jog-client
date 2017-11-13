import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DARK_GRAY } from 'src/common/constants/palette';
import FlexCentredContainer from 'src/web/components/FlexCentredContainer';
import Jumbotron from 'src/web/components/Jumbotron';

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

class AuthHomeScreen extends React.Component<{}, {}> {
  public render() {
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
