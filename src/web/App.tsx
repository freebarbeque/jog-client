import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from './history';
import {BLUE} from 'src/common/constants/palette';
import styled from 'styled-components';
import MainScreen from './screens/App/MainScreen';
import HomePage from './HomePage';

import Auth from 'src/web/next/modules/Auth';
import PrivateRoute from 'src/web/common/components/utils/PrivateRoute';
import PublicRoute from 'src/web/common/components/utils/PublicRoute';

const Container = styled.div`
  background: ${BLUE};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      // text-decoration: underline;
      text-decoration: none;
    }

    &:hover,
    &:visited,
    &:active {
      color: white;
    }
  }

  p {
    color: white;
  }
`

class App extends React.Component<{}, {}> {
    public render() {
        return (
            <ConnectedRouter history={history}>
                <Container>
                    <Switch>
                        <PublicRoute
                            forceLoggedOut={true}
                            path={'/auth'}
                            component={Auth}
                        />
                        <PrivateRoute
                            path="/app"
                            component={MainScreen}
                        />
                        <Route path="/" exact component={HomePage} />
                    </Switch>
                </Container>
            </ConnectedRouter>
        )
    }
}

export default App;
