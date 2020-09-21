import * as actions from './actionTypes';
import * as api from '../../utils/linkAPI';

export const fetchCategory = () => {
    return {
        type: actions.CATEGORY_FETCHED,
        payload: api.fetchCategory(),
    };
};

export const fetchMenus = () => {
    return {
        type: actions.MENU_FETCHED,
        payload: api.fetchAllMenu(),
    };
};

export const menuByCategory = (category_name) => {
    return {
        type: actions.MENU_BY_CATEGORY,
        payload: api.fetchMenuByCategory(category_name),
    };
};

export const deleteMenu = (id) => {
    return {
        type: actions.DELETE_MENU,
        payload: api.deleteMenu(id),
    };
};

// SEARCH
export const searchMenu = (name, by) => {
    return {
        type: actions.SEARCH_MENU,
        payload: api.searchMenu(name, by),
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
