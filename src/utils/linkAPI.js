import Axios from 'axios';
// import Config from 'react-native-config';

const localhost = 'http://192.168.1.137:8000';

export const fetchAllMenu = () => {
    // return Axios.get(`${Config.API_ADDRESS}/products`);
    return Axios.get(`${localhost}/products`);
};

export const fetchAllHistory = () => {
    return Axios.get(`${process.env.REACT_APP_API_ADDRESS}/history`);
};

export const showHistory = () => {
    return Axios.get(`${process.env.REACT_APP_API_ADDRESS}/history/history/show`);
};

export const login = (data) => {
    return Axios.post(`${localhost}/auth/login`, data);
};

export const register = (data) => {
    return Axios.post(`${localhost}/auth/register`, data);
};
