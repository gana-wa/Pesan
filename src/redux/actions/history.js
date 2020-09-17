import * as actions from './actionTypes';
import * as api from '../../utils/linkAPI';

export const fetchHistoryCreator = (name) => {
    return {
        type: actions.HISTORY_FETCHED,
        payload: api.fetchAllHistory(name),
    };
};

export const showHistoryCreator = (invoice) => {
    return {
        type: actions.SHOW_HISTORY,
        payload: api.showHistory(invoice),
    };
};

export const clearHistoryCreator = () => {
    return {
        type: actions.CLEAR_HISTORY,
    };
};
