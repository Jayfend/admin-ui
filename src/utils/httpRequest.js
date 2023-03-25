import axios from 'axios';
import Cookies from 'js-cookie';

const jwt_token = Cookies.get('jwt-admin');

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${jwt_token}`
    }
    // withCredentials: true,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response;
};

export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);
    return response;
};

export const remove = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response;
};

export default httpRequest;
