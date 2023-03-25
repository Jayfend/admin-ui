import { httpRequest } from 'utils/index';

export const getBestSellerPerMonthSortbyBuy = async (Year, Month, Take) => {
    try {
        const res = await httpRequest.get(`Charts/BestSellerPerMonthSortbyBuy/${Year}/${Month}/${Take}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getBestSellerPerMonthSortbyTotal = async (Year, Month, Take) => {
    try {
        const res = await httpRequest.get(`Charts/BestSellerPerMonthSortbyTotal/${Year}/${Month}/${Take}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
