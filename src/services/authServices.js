import Cookies from 'js-cookie';

import { httpRequest } from 'utils/index';
import jwtDecode from 'jwt-decode';

export const login = async (user) => {
    try {
        const res = await httpRequest.post('Users/authenticate', user);
        return res.data;
    } catch (error) {
        if (error.code === 'ERR_NETWORK') {
            return { message: error.message, isSuccess: false };
        }
        return { message: error.response.data.message, isSuccess: false };
    }
};

export const logout = () => {
    Cookies.remove('jwt-admin');
    Cookies.remove('admin-id');
};

export const isLoggedIn = () => {
    const jwt = Cookies.get('jwt-admin');
    const userId = Cookies.get('admin-id');
    if (jwt === undefined || userId === undefined) {
        Cookies.remove('jwt-admin');
        Cookies.remove('admin-id');
        return false;
    }

    try {
        const jwt_decode = jwtDecode(jwt);
        if (jwt_decode.NameIdentifier === userId) {
            return true;
        } else {
            Cookies.remove('jwt-admin');
            Cookies.remove('admin-id');
            return false;
        }
    } catch (error) {
        Cookies.remove('jwt-admin');
        Cookies.remove('admin-id');
        console.log(error);
        return false;
    }
};

export const register = async (account) => {
    try {
        const res = await httpRequest.post('Users/register', account);
        return res.data;
    } catch (error) {
        if (error.code === 'ERR_NETWORK') {
            return { message: error.message, isSuccess: false };
        }
        console.log(error);
        return { message: error.response.data.message, isSuccess: false };
    }
};
