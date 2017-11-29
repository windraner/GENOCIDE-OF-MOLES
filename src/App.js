import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import MainContainer from './containers/MainContainer';

export const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    );
  }
}

