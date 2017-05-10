import {Component} from 'react';
import {render} from 'react-dom';
import routes from '../route/router';

export default class Root extends Component {
  render() {
    return routes;
  }
}
