import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {BLUE} from 'src/common/constants/palette';
import {Logo} from 'src/web/images';

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  };
`;

const Header = (props: any) => (
  <div className={props.className}>
    <Logo />
    <LinksContainer>
      <Link to="/">Policies</Link>
      <Link to="/">Markets</Link>
      <Link to="/">Settings</Link>
      <Link to="/">Login</Link>
    </LinksContainer>
  </div>
);

const StyledHeader = styled(Header)`
  background-color: ${BLUE};
  height: 70px;
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  padding: 0 43px;
`;

export default StyledHeader;