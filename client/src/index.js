"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, match, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './route/router';
import store from './redux/store'
import { AppContainer } from 'react-hot-loader';
import Root from './view/root';

const renderIndex = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
};

renderIndex(Root);

if (module.hot) {
  module.hot.accept(() => renderIndex(Root))
}
