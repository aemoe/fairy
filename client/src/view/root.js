import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Provider } from 'react-redux';
import routes from '../route/router';

export default class Root extends Component {
  render() {
    return routes;
  }
}
