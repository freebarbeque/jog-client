import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './native/nav/main/NavigationContainer'
import createStore from './native/modules/store/store';

const store = createStore();

export default () => <Provider store={store}><Navigation/></Provider>;