import * as actions from './actionTypes';
import * as api from '../../utils/linkAPI';

export const fetchHistoryCreator = () => {
    return {
        type: actions.HISTORY_FETCHED,
        payload: api.fetchAllHistory()
    }
};

export const showHistoryCreator = () => {
    return {
        type: actions.SHOW_HISTORY,
        payload: api.showHistory()
    }
}