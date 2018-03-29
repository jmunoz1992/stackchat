// so that we can say
// import { Main } from './components';
// instead of
// import { Main } from './components/Main;

import { Provider } from 'react-redux';
import store from '../store';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import ChannelList from './ChannelList';

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Main />
    <ChannelList />
  </Router>
  </Provider>,
  document.getElementById('app')
);

export { default as Main } from './Main';
