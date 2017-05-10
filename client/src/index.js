'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
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
  );
};

renderIndex(Root);

if (module.hot) {
  module.hot.accept(() => renderIndex(Root));
}
