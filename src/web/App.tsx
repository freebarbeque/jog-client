import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';

class App extends React.Component<{}, {}> {
  public render() {
    return (
        <ConnectedRouter history={history}>
          <div>
            111
          </div>
        </ConnectedRouter>
    )
  }
}

export default App;
