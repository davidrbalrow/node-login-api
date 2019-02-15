import axios from 'axios';
import { resolve } from 'url';
//import signupPage from '../components/SignupPage';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export function login(email, password) {
    return dispatch => {
    
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    console.log('login');

    // callLoginApi(email, password, error => {
    //   dispatch(setLoginPending(false));
    //   if (!error) {
    //     console.log('sucess');
    //     dispatch(setLoginSuccess(true));
    //   } else {
    //       console.log('error');
    //     dispatch(setLoginError(error));
    //   }
    // });
    callLoginApi(email, password).then((res)=>{
        console.log('sucess!')
        dispatch(setLoginSuccess(true));
        dispatch(setAuthToken(res.headers['x-auth']));
       
    }).then(()=>{console.log(dispatch(setLoginPending(false)))}).then(()=>{console.log('last then');});
    
  };
 
};

export function signup(email,password){
    return dispatch => {

    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    console.log('login');

    return callSignupApi(email, password).then((res)=>{
        if (res.request.status===200){
        console.log('sucess!', res)
        dispatch(setLoginSuccess(true));
        dispatch(setAuthToken(res.headers['x-auth']));
        dispatch(setLoginPending(false));
        resolve();}
       else {console.log('here else',res);     
        return Promise.reject(res.data.errmsg.search("duplicate key"));}
           //throw(res.data.errmsg.search("duplicate key"));}
    });

  // console.log('test1', test);
// }).then(()=>{console.log(dispatch(setLoginPending(false)))}).then(()=>{console.log('last then');});
    // can i catch response?
}
}

const callSignupApi = (email, password) =>{
    console.log('axios');
    return axios.post('http://localhost:3000/user/',{
        email,
	password
    }).then((res)=>{
        console.log('res.request.status',res.request.status)
        return(res)
    }).catch((e)=>{
        console.log('signup api',e.response);
        return(e.response);
    })
};


function setLoginPending(bool) {
    console.log('login is pending');
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending : bool
  };
}

function setLoginSuccess(isLoginSuccess) {
    console.log('login status success');
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
    console.log('login status error');
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
};

function setAuthToken(authToken) {
    console.log('setting token',authToken);
  return {
    type: SET_AUTH_TOKEN,
    authToken
  }
};

const callLoginApi = (email, password) =>{
    console.log('axios');
    return axios.post('http://localhost:3000/user/login',{
        email,
	password
    }).then((res)=>{
        console.log('res login api',res);
        return(res);
    }).catch((e)=>{
        console.log('callLoginAPi',e);
        return(e);
    })
};

