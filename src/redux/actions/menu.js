import * as actions from './actionTypes';
import * as api from '../../utils/linkAPI';

export const fetchMenus = () => {
    return {
        type: actions.MENU_FETCHED,
        payload: api.fetchAllMenu(),
    };
};

// SEARCH
export const searchMenu = (key) => {
    return {
        type: actions.SEARCH_MENU,
        payload: {
            key: key,
        },
    };
};

// CART
export const addToCart = (id, name, price, img) => {
    return {
        type: actions.MENU_TO_CART,
        payload: {
            id,
            name,
            quantity: 1,
            price,
            img,
        },
    };
};

export const increaseQuantityCreator = (id) => {
    return {
        type: actions.QUANTITY_INCREASED,
        payload: {
            id: id,
        },
    };
};

export const decreaseQuantityCreator = (id) => {
    return {
        type: actions.QUANTITY_DECREASED,
        payload: {
            id: id,
        },
    };
};

export const clearCartCreator = () => {
    return {
        type: actions.CLEAR_CART,
    };
};
