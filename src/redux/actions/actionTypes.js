import { ActionType } from 'redux-promise-middleware';

export const MENU_FETCHED = 'menuFetched';
export const MENU_BY_CATEGORY = 'MENU_BY_CATEGORY';
export const QUANTITY_INCREASED = 'quantityIncreased';
export const QUANTITY_DECREASED = 'quantityDecreased';
export const MENU_TO_CART = 'addToCart';
export const CLEAR_CART = 'emptyCart';
export const TOTAL_PRICE = 'totalPrice';
export const SEARCH_MENU = 'searchMenu';
export const DELETE_MENU = 'DELETE_MENU';
export const EDIT_MENU = 'EDIT_MENU';

export const CATEGORY_FETCHED = 'categoryFetched';

export const HISTORY_FETCHED = 'historyFetched';
export const SHOW_HISTORY = 'showHistory';
export const CLEAR_HISTORY = 'clearHistory';

export const LOGGED_IN = 'loggedIn';
export const REGISTERED = 'registered';
export const LOGGED_OUT = 'loggedOut';
export const EDIT_USER = 'EDIT_USER';

export const PENDING = `_${ActionType.Pending}`;
export const FULFILLED = `_${ActionType.Fulfilled}`;
export const REJECTED = `_${ActionType.Rejected}`;
