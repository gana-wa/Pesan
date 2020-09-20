import * as actions from '../actions/actionTypes';

const intialState = {
   isLoggedIn: false,
   isPending: false,
   isSuccess: false,
   isRejected: false,
   user: {
      name: '',
      telp: '',
      level_id: null,
      token: '',
      id: '',
   },
   msg: '',
};

const authReducer = (state = intialState, action) => {
   switch (action.type) {
      case actions.LOGGED_IN + actions.PENDING:
         return {
            ...state,
            isPeding: true,
            msg: '...Loading',
         };
      case actions.LOGGED_IN + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            msg: 'Login failed..!',
         };
      case actions.LOGGED_IN + actions.FULFILLED:
         if (action.payload.data.isSuccess) {
            return {
               ...state,
               isLoggedIn: true,
               isSuccess: true,
               isPending: false,
               user: {
                  ...state.user,
                  name: action.payload.data.data.name,
                  telp: action.payload.data.data.telp,
                  level_id: action.payload.data.data.level_id,
                  token: action.payload.data.data.token,
                  id: action.payload.data.data.id,
               },
               msg: action.payload.data.data.msg,
            };
         } else {
            return {
               ...state,
               isSuccess: false,
               isPending: false,
               isLoggedIn: false,
               msg: action.payload.data.data.msg,
            };
         }
      case actions.REGISTERED + actions.PENDING:
         return {
            ...state,
            isPeding: true,
            msg: '...Loading',
         };
      case actions.REGISTERED + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            msg: action.payload.data.data.msg,
         };
      case actions.REGISTERED + actions.FULFILLED:
         if (action.payload.data.isSuccess) {
            return {
               ...state,
               isLoggedIn: true,
               isSuccess: true,
               isPending: false,
               user: {
                  ...state.user,
                  name: action.payload.data.data.name,
                  telp: action.payload.data.data.telp,
                  level_id: action.payload.data.data.level_id,
                  token: action.payload.data.data.token,
                  id: action.payload.data.data.id,
               },
               msg: `${action.payload.data.data.msg}, now you can login`,
            };
         } else {
            return {
               ...state,
               isSuccess: false,
               isPending: false,
               isLoggedIn: false,
               msg: action.payload.data.data.msg,
            };
         }
      // EDIT
      case actions.EDIT_USER + actions.PENDING:
         return {
            ...state,
            isPeding: true,
            msg: '...Loading',
         };
      case actions.EDIT_USER + actions.REJECTED:
         return {
            ...state,
            isRejected: true,
            isPending: false,
            msg: action.payload.data.data.msg,
         };
      case actions.EDIT_USER + actions.FULFILLED:
         if (action.payload.data.isSuccess) {
            return {
               ...state,
               // isLoggedIn: true,
               isSuccess: true,
               isPending: false,
               user: {
                  ...state.user,
                  name: action.payload.data.data.name,
                  telp: action.payload.data.data.telp,
                  // level_id: action.payload.data.data.level_id,
                  // token: action.payload.data.data.token,
               },
               msg: action.payload.data.data.msg,
            };
         } else {
            return {
               ...state,
               isSuccess: false,
               isPending: false,
               isLoggedIn: false,
               msg: action.payload.data.data.msg,
            };
         }
      // LOGOUT
      case actions.LOGGED_OUT:
         return {
            isLoggedIn: false,
            isPending: false,
            isSuccess: false,
            isRejected: false,
            user: {
               name: '',
               telp: '',
               level_id: null,
               token: '',
               id: '',
            },
            msg: '',
         };
      default:
         return state;
   }
};

export default authReducer;
