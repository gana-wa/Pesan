import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rpm from 'redux-promise-middleware';

import indexReducer from './reducers/index';

const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);

const store = createStore(indexReducer, enhancers);

export default store;