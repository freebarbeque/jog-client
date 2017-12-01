import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {BLUE} from 'src/common/constants/palette';
import {Logo} from 'src/web/images';

const Header = (props: any) => (
    <div className={props.className}>
        <Logo />
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
  flex-shrink: 0;
`;

export default StyledHeader;