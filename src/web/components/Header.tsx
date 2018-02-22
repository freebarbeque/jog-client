import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {BLUE} from 'src/common/constants/palette';
import {Logo} from 'src/web/images';
import {getUser} from 'src/common/selectors/auth';
import {connect} from 'react-redux';
import {IUser} from '~/common/interfaces/user';
import {IReduxState} from '~/common/interfaces/store';
import {logOut} from 'src/common/actions/auth';
import {Action, ActionCreator, bindActionCreators} from 'redux';

import { logout } from 'src/web/next/store/auth/actions';

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

const A = styled.a`
    &:hover {
      cursor: pointer;
    }
`

interface IHeaderProps {
    className: string;
    loggedIn: boolean;
    logout: any;
}

const Header = (props: IHeaderProps) => (
    <div className={props.className}>
        
        <Link to="/"><Logo /></Link>
        <LinksContainer>
            <Link to="/">Policies</Link>
            <Link to="/">Settings</Link>
            {props.loggedIn
                ? <A onClick={() => props.logout()}>Logout</A>
                : <Link to="/auth/login">Login</Link>
            }
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
  flex-shrink: 0;
`;

const mapStateToProps = (state: IReduxState): Partial<IHeaderProps> => ({
    loggedIn: !!state.nextStore.auth.currentUser && !!state.nextStore.auth.currentUser.confirmed,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledHeader) as any;