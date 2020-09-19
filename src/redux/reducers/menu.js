import * as actions from '../actions/actionTypes';

const intialState = {
   menus: [],
   carts: [],
   category: [],
   cashier: '',
   isPending: false,
   isFulfilled: false,
   isRejected: false,
};

const menuReducer = (state = intialState, action) => {
   let newCart = [...state.carts];
   // let newMenu = [...state.menus];
   switch (action.type) {
      case actions.CATEGORY_FETCHED + actions.PENDING:
         return {
            ...state,
            isPending: true,
         };
      case actions.CATEGORY_FETCHED + actions.PENDING:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            error: action.payload.menu,
         };
      case actions.CATEGORY_FETCHED + actions.FULFILLED:
         return {
            ...state,
            isPending: false,
            isRejected: false,
            isFulfilled: true,
            category: action.payload.data.data,
         };
      // FETCH MENU
      case actions.MENU_FETCHED + actions.PENDING:
         return {
            ...state,
            isPending: true,
         };
      case actions.MENU_FETCHED + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            isFulfilled: false,
            error: action.payload.menu,
         };
      case actions.MENU_FETCHED + actions.FULFILLED:
         return {
            ...state,
            isFulfilled: true,
            isPending: false,
            menus: action.payload.data.data,
         };
      // MENU BY CATEGORY
      case actions.MENU_BY_CATEGORY + actions.PENDING:
         return {
            ...state,
            isPending: true,
         };
      case actions.MENU_BY_CATEGORY + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            isFulfilled: false,
            error: action.payload.menu,
         };
      case actions.MENU_BY_CATEGORY + actions.FULFILLED:
         return {
            ...state,
            isFulfilled: true,
            isPending: false,
            menus: action.payload.data.data,
         };
      // SEARCH
      case actions.SEARCH_MENU + actions.PENDING:
         return {
            ...state,
            isPending: true,
         };
      case actions.SEARCH_MENU + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            isFulfilled: false,
            error: action.payload.menu,
         };
      case actions.SEARCH_MENU + actions.FULFILLED:
         return {
            ...state,
            isFulfilled: true,
            isPending: false,
            menus: action.payload.data.data,
         };
      // CART
      case actions.MENU_TO_CART:
         let newMenu = [...state.menus];
         const index = state.carts.findIndex((item) => {
            return action.payload.id === item.id;
         });
         const indexMenu = state.menus.findIndex((item) => {
            return action.payload.id === item.product_id;
         });
         if (index >= 0) {
            newMenu[indexMenu] = {
               ...newMenu[indexMenu],
               selected: false,
            };
            state.carts.splice(index, 1);//hapus data pada array
            return {
               ...state,
               carts: state.carts,
               menus: newMenu,
            };
         } else {
            newMenu[indexMenu] = {
               ...newMenu[indexMenu],
               selected: true,
            };
            return {
               ...state,
               carts: state.carts.concat(action.payload),
               menus: newMenu,
            };
         }
      case actions.QUANTITY_INCREASED:
         const indexQtyInc = state.carts.findIndex((item) => {
            return action.payload.id === item.id;
         });
         newCart[indexQtyInc] = {
            ...newCart[indexQtyInc],
            quantity: state.carts[indexQtyInc].quantity + 1,
         };
         return {
            ...state,
            carts: newCart,
         };
      case actions.QUANTITY_DECREASED:
         const indexQtyDec = state.carts.findIndex((item) => {
            return action.payload.id === item.id;
         });
         newCart[indexQtyDec] = {
            ...newCart[indexQtyDec],
            quantity: state.carts[indexQtyDec].quantity - 1,
         };
         if (newCart[indexQtyDec].quantity === 0) {
            state.carts.splice(indexQtyDec, 1);//hapus data pada array
            return {
               ...state,
               carts: state.carts,
            };
         } else {
            return {
               ...state,
               carts: newCart,
            };
         }
      case actions.CLEAR_CART:
         return {
            ...state,
            carts: [],
         };
      default:
         return state;
   }
};

export default menuReducer;
