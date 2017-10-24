import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './nav/main/NavigationContainer'
import createStore from "./modules/store/store";

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  store = createStore();

  render() {
    return (
      <Provider store={this.store}>
          <Navigation/>
      </Provider>
    );
  }
}