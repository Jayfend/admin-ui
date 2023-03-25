import { httpRequest } from 'utils/index';
import Cookies from 'js-cookie';

export const getContact = async () => {
    try {
        const res = await httpRequest.get(`Contact`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async () => {
    try {
        const jwt_token = Cookies.get('jwt-admin');

        const res = await httpRequest.get(`Checkouts/AllBill`, {
            headers: {
                Authorization: `Bearer ${jwt_token}`
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
