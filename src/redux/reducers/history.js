import * as actions from '../actions/actionTypes';

const intialState = {
    history: [],
    showHistory: [],
    isPending: false,
    isFulfilled: false,
    isRejected: false,
}

const historyReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.HISTORY_FETCHED + actions.PENDING:
            return {
                ...state,
                isPending: true,
            };
        case actions.HISTORY_FETCHED + actions.REJECTED:
            return {
                ...state,
                isRejected: true,
                isPending: false,
                error: action.payload,
            };
        case actions.HISTORY_FETCHED + actions.FULFILLED:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                history: action.payload.data.data,
            };
        // ONLY HISTORY
        case actions.SHOW_HISTORY + actions.PENDING:
            return {
                ...state,
                isPending: true,
            };
        case actions.SHOW_HISTORY + actions.REJECTED:
            return {
                ...state,
                isRejected: true,
                isPending: false,
                error: action.payload,
            };
        case actions.SHOW_HISTORY + actions.FULFILLED:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                showHistory: action.payload.data.data,
            };
        default:
            return state;
    }
};

export default historyReducer;