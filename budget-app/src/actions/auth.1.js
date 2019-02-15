import axios from 'axios';

export const login = (token) => ({
    type: 'LOGIN',
    token
})

export const startLogin = (email, password) => {
    return (email, password) => {
        //call api for login
        //return Promise that contains token
         return axios.post('/user/login',{
            email,
            password
        });
    };
};

export const logout = (uid) => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return 0;
    };
};