import Cookies from 'js-cookie';
import { httpRequest } from 'utils/index';

export const getUserTable = async (index, page) => {
    try {
        const res = await httpRequest.get(`Users/paging?PageIndex=${index}&PageSize=${page}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await httpRequest.remove(`Users/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async (id) => {
    try {
        const res = await httpRequest.get(`Users/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putUser = async (data) => {
    try {
        const res = await httpRequest.put(`Users`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getRole = async () => {
    try {
        const res = await httpRequest.get(`Roles`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putRoleUser = async (id, role) => {
    try {
        const jwt_token = Cookies.get('jwt-admin');
        const res = await httpRequest.put(`Users/${id}/roles`, role, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
