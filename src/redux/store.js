import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rpm from 'redux-promise-middleware';
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-community/async-storage';

import indexReducer from './reducers/index';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, indexReducer);

const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);


export default () => {
   let store = createStore(persistedReducer, enhancers);
   let persistor = persistStore(store);
   return {
      store,
      persistor,
   };
};
