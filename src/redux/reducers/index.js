import { combineReducers } from 'redux';
import menuReducer from './menu';
import historyReducer from './history';
import authReducer from './auth';

const indexReducer = combineReducers({
    menu: menuReducer,
    history: historyReducer,
    auth: authReducer,
});

export default indexReducer;