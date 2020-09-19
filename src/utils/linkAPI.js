import Axios from 'axios';
// import Config from 'react-native-config';

const localhost = 'http://192.168.1.137:8000';

export const fetchCategory = () => {
    return Axios.get(`${localhost}/category`);
};

export const fetchAllMenu = () => {
    // return Axios.get(`${Config.API_ADDRESS}/products`);
    return Axios.get(`${localhost}/products`);
};

export const fetchMenuByCategory = (category_name) => {
    return Axios.get(`${localhost}/products/category/${category_name}`);
};

export const searchMenu = (name, by) => {
    return Axios.get(`${localhost}/products/search?product_name=${name}&by=${by}`);
};

export const insertTransaction = (data) => {
    return Axios.post(`${localhost}/transaction`, data);
};

export const fetchAllHistory = (name) => {
    return Axios.get(`${localhost}/history/name/${name}`);
};

export const showHistory = (invoice) => {
    return Axios.get(`${localhost}/history/invoice/${invoice}`);
};

export const login = (data) => {
    return Axios.post(`${localhost}/auth/login`, data);
};

export const register = (data) => {
    return Axios.post(`${localhost}/auth/register`, data);
};
