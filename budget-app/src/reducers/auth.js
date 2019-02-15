
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

const defaultState = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null,
    authToken: ''
};


export default function reducer(state = defaultState, action) {
    switch (action.type) {
    //   case SET_LOGIN_PENDING:
    //     return Object.assign({}, state, {
    //       isLoginPending: action.isLoginPending
    //     });
    
    case SET_LOGIN_PENDING:
    console.log('set pending reducer',state);
        return {
         ...state,
         isLoginPending: action.isLoginPending
        };
      case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess
       };
  
      case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError
       };
    case SET_AUTH_TOKEN:
    console.log('set auth token',state);
       return {
           ...state,
           authToken: action.authToken
       };
      default:
        return state;
    }
  }