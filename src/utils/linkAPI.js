import Axios from 'axios';
// import Config from 'react-native-config';

export const fetchAllMenu = () => {
    // return Axios.get(`${Config.API_ADDRESS}/products`);
    return Axios.get('http://192.168.1.106:8000/products');
};

export const fetchAllHistory = () => {
    return Axios.get(`${process.env.REACT_APP_API_ADDRESS}/history`);
};

export const showHistory = () => {
    return Axios.get(`${process.env.REACT_APP_API_ADDRESS}/history/history/show`);
};

export const login = (data) => {
    return Axios.post(`${process.env.REACT_APP_API_ADDRESS}/auth/login`, data);
};

export const register = (data) => {
    return Axios.post(`${process.env.REACT_APP_API_ADDRESS}/auth/register`, data);
};
