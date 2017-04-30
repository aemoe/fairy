import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default applyMiddleware(
  thunk , logger
)
