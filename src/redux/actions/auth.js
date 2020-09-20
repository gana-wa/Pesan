import * as actions from './actionTypes';
import * as api from '../../utils/linkAPI';

export const registered = (data) => {
    return {
        type: actions.REGISTERED,
        payload: api.register(data),
    };
};

export const loggedIn = (data) => {
    return {
        type: actions.LOGGED_IN,
        payload: api.login(data),
    };
};

export const LoggedOut = () => {
    return {
        type: actions.LOGGED_OUT,
    };
};

export const editUser = (id, data) => {
    return {
        type: actions.EDIT_USER,
        payload: api.editUser(id, data)
    }
}