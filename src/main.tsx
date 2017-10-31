import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './nav/main/NavigationContainer'
import createStore from "./modules/store/store";

const store = createStore();

export default () => <Provider store={store}><Navigation/></Provider>;