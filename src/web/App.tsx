import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from './history';
import {BLUE} from 'src/common/constants/palette';
import styled from 'styled-components';
import AuthScreen from './screens/Auth/AuthScreen';

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
      text-decoration: underline;
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
                    <Route
                        path="/auth"
                        component={AuthScreen}
                    />
                </Container>
            </ConnectedRouter>
        )
    }
}

export default App;
